import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = 3008;

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "story_tailor",
  port: 3006,
});

// help function to make code look nicer
async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

// Generera engångslösenord
function generateOTP() {
  // Generera en sexsiffrig numerisk OTP
  const token = Math.floor(100000 + Math.random() * 900000);
  return token.toString();
}

app.get("/users/check/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const result = await query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (result.length > 0) {
      res.json({ available: false });
    } else {
      res.json({ available: true });
    }
  } catch (error) {
    console.error("Error checking username availability", error);
    res.status(500).send("Error checking username availability");
  }
});

app.post("/users", async (req, res) => {
  const { username, password } = req.body;

  // Kryptera lösenordet innan det hamnar i DB
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    // Skapa användaren i users-tabellen
    const userResult = await query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );
    const userId = userResult.insertId; // Få det nya användar-ID:t

    res.status(201).send("User created");
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).send("Error creating user");
  }
});

app.post("/sessions", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch user from the database
    const result = await query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    const user = result[0];

    if (!user) {
      return res.status(401).send("Invalid username or password");
    }

    // Check if passwords match
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Invalid username or password");
    }

    // Generate OTP/token
    const token = generateOTP();

    // Insert login info into the sessions table with user_id and token
    const loginResult = await query(
      "INSERT INTO sessions (user_id, token) VALUES (?, ?)",
      [user.id, token]
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).send("Error during login");
  }
});

app.post("/storyTeller", async (req, res) => {
  const storyType = req.body.storyType || "fairytale";
  const storyHappening =
    req.body.storyHappening || "a princess who fell from a tree";

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Tell me a ${storyType} story for children about ${storyHappening} that's interesting.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const result = completion.choices[0].message.content;

    res.json({ story: result });
  } catch (error) {
    console.error("Failed to generate story", error);
    res.status(500).send("Failed to generate story");
  }
});

app.post("/generateImage", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    const image_url = response.data[0].url;
    res.json({ image_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

app.post("/saveStory", async (req, res) => {
  const { storyType, storyHappening, storyText, image_url, currentPage } =
    req.body;
  const token = req.headers.authorization.split(" ")[1]; // Extract token from Authorization header

  try {
    // Validate token and get user ID
    const session = await query("SELECT * FROM sessions WHERE token = ?", [
      token,
    ]);
    if (!session || session.length === 0) {
      return res.status(401).send("Invalid session token");
    }

    const user_id = session[0].user_id;

    // Download the image and save it to the server
    const imageFilename = `${Date.now()}.jpg`;
    const imagePath = path.join(__dirname, "uploads", imageFilename);
    const response = await axios({
      url: image_url,
      method: "GET",
      responseType: "stream",
    });

    const writer = fs.createWriteStream(imagePath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    // Save story with user_id and relative image path
    const relativeImagePath = `uploads/${imageFilename}`;
    const result = await query(
      "INSERT INTO stories (story_type, story_happening, story_text, image_url, user_id, current_page) VALUES (?, ?, ?, ?, ?, ?)",
      [
        storyType,
        storyHappening,
        storyText,
        relativeImagePath,
        user_id,
        currentPage,
      ]
    );

    res.status(200).json({ message: "Story saved", storyId: result.insertId });
  } catch (error) {
    console.error("Error saving story", error);
    res.status(500).json({ message: "Error saving story" });
  }
});

app.get("/getSavedStories", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1]; // Extract token from Authorization header

  try {
    console.log("Received token:", token);
    // Validate token and get user ID
    const session = await query("SELECT * FROM sessions WHERE token = ?", [
      token,
    ]);

    console.log("Session data:", session);

    if (!session || session.length === 0) {
      return res.status(401).send("Invalid session token");
    }

    const user_id = session[0].user_id;
    console.log("User ID:", user_id);

    // Fetch stories for user_id
    const sql = "SELECT * FROM stories WHERE user_id = ?";
    const stories = await query(sql, [user_id]);

    console.log("Fetched stories:", stories);

    // Modify imageUrl to include the full URL path
    const updatedStories = stories.map((story) => {
      if (story.image_url) {
        story.image_url = `http://localhost:3008/${story.image_url}`;
      }
      return story;
    });

    res.json(updatedStories);
  } catch (error) {
    console.error("Error fetching user stories", error);
    res.status(500).send("Failed to fetch user stories");
  }
});

app.delete("/deleteStory/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).send("Authorization token required");
  }
  try {
    const session = await query("SELECT * FROM sessions WHERE token=?", [
      token,
    ]);
    if (session.length === 0) {
      return res.status(401).send("Invalid or expired session token");
    }

    const story = await query("SELECT * FROM stories WHERE id = ?", [id]);
    if (story.length === 0) {
      return res.status(404).send("Story not found");
    }

    const imagePath = path.join(__dirname, story[0].image_url);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Failed to delete image file", err);
      }
    });

    // Delete story from db
    await query("DELETE FROM stories WHERE id=?", [id]);
    res.send("Story deleted successfully");
  } catch (error) {
    console.error("Error deleting story", error);
    res.status(500).send("Error deleting story");
  }
});

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});

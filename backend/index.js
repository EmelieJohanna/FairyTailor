import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
const PORT = 3008;

//middleware
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "story_tailor",
  port: 8889,
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

// app.get("/sessions/check", async (req, res) => {
//   const { user_id } = req.body;

//   try {
//     console.log("User ID from request:", user_id);

//       const sessionsCheck = await query(
//         "SELECT * FROM sessions WHERE user_id = ?",
//         [user_id]);

//       if (sessionsCheck.length > 0) {
//         // User details found
//         const user = sessionsCheck[0];
//         console.log("User details:", user); // Log user details

//         res.json({ loggedIn: true });
//       } else {
//         // User not found in the database
//         res.json({ loggedIn: false });
//       }

//   } catch (error) {
//     console.error("Error checking login status:", error);
//     res.status(500).send("Error checking login status");
//   }
// });

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

// Save Story Endpoint
app.post("/saveStory", async (req, res) => {
  const { storyType, storyHappening, storyText } = req.body;
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

    // Save story with user_id
    const result = await query(
      "INSERT INTO stories (story_type, story_happening, story_text, user_id) VALUES (?, ?, ?, ?)",
      [storyType, storyHappening, storyText, user_id]
    );

    res.status(200).json({ message: "Story saved", storyId: result.insertId });
  } catch (error) {
    console.error("Error saving story", error);
    res.status(500).json({ message: "Error saving story" });
  }
});

// Fetch User Stories Endpoint
app.get("/userStories", async (req, res) => {
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

    // Fetch stories for user_id
    const sql = "SELECT * FROM stories WHERE user_id = ?";
    const stories = await query(sql, [user_id]);

    res.json(stories);
  } catch (error) {
    console.error("Error fetching user stories", error);
    res.status(500).send("Failed to fetch user stories");
  }
});

app.delete("/userStories/:id", async (req, res) => {
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

    const story = await query("SELECT user_id * FROM stories WHERE user_id=?", [
      id,
    ]);
    if (story.length === 0) {
      return res.status(404).send("Story not found");
    }
    await query("DELETE FROM storis WHERE id=?", [id]);
    res.send("Story deleted successfully");
  } catch (error) {
    console.error("Error deleting story", error);
  }
});

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});

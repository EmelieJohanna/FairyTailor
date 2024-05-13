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

    // Insert login info into the sessions table with user_id
    const loginResult = await query(
      "INSERT INTO sessions (user_id) VALUES (?)",
      [user.id]
    );

    res.status(200).json({ message: "Login successful" });
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

app.post("/saveStory", async (req, res) => {
  const { storyType, storyHappening, storyText } = req.body;
  try {
    const result = await query(
      "INSERT INTO stories (story_type, story_happening, story_text ) VALUES (?, ?, ?)",
      [storyType, storyHappening, storyText]
    );
    res.status(200).json({ message: "Story saved", storyId: result.insertId });
  } catch (error) {
    console.error("Error saving story", error);
    res.status(500).json({ messege: "Error saving story" });
  }
});

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});

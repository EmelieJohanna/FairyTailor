import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";


dotenv.config();

const app = express();
const PORT = 3009;

//middleware
app.use(cors());
app.use(bodyParser.json());

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

    // Skapa ett konto för användaren i accounts-tabellen
    await query(
      "INSERT INTO accounts (user_id, balance) VALUES (?, ?)",
      [userId, 0] // Skapa med 0 kr som saldo
    );

    res.status(201).send("User and account created");
  } catch (error) {
    console.error("Error creating user and account", error);
    res.status(500).send("Error creating user and account");
  }
});


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/joke", async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Tell me a story",
      },
    ],
    model: "gpt-3.5.turbo",
  });
  const result = completion.choices[0].message.content;

  res.send(result);
});

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});

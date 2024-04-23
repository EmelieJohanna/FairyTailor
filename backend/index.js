import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3009;

//middleware
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/joke", async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;

  const completion = await openai.chat.completions.create({
    messeges: [
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

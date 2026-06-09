const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.use(express.json());

// Load questions helper
function loadQuestions() {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, "data", "questions.json"), "utf8"));
  } catch (err) {
    return [{ "number": 0, "question": "No questions loaded yet.", "answer": "0" }];
  }
}

// RANDOM QUESTION API
app.get("/api/question", (req, res) => {
  const questions = loadQuestions();
  const q = questions[Math.floor(Math.random() * questions.length)];
  res.json(q);
});

// EVENTS API
app.get("/api/events", (req, res) => {
  try {
    const events = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "events.json"), "utf8"));
    res.json(events);
  } catch (err) {
    res.json([]);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Chaos & Dabbers running on " + PORT));

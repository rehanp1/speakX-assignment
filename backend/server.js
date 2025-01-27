const express = require("express");
const cors = require("cors");
const dbConnection = require("./db/connection.js");
const Question = require("./model/question.js");

const PORT = "5000";
const app = express();
app.use(cors());
app.use(express.json());

dbConnection("mongodb://localhost:27017/speakX");

app.get("/questions", async (req, res) => {
  const title = req.query.title;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  if (page <= 0 || limit <= 0) {
    res.status(400).json({ message: "Invalid page and limit" });
    return;
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};

  const response = await Question.find({ $text: { $search: `\"${title}\"` } })
    .limit(limit)
    .skip(startIndex);
  const totalItemFound = await Question.find({ $text: { $search: `\"${title}\"` } });

  if (endIndex < totalItemFound.length)
    results.next = {
      page: page + 1,
      limit: limit,
    };

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.total = totalItemFound.length;
  results.data = response;

  res.status(200).json(results);
});

app.listen(PORT, async () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

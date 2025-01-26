const express = require("express");
const cors = require("cors");
const dbConnection = require("./db/connection.js");
const Question = require("./model/question.js");

const PORT = "5000";
const app = express();
app.use(cors());
app.use(express.json());

app.get("/questions", async (req, res) => {
  try {
    const { title } = req.query;
    const response = await Question.find({ type: title });
    res.status(200).json({ data: response });
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
});

app.listen(PORT, async () => {
  await dbConnection("mongodb://localhost:27017/speakX");
  console.log(`Server listening on http://localhost:${PORT}`);
});

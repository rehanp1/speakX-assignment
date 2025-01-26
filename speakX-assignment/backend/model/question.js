const mongoose = require("mongoose");

const blocksOption = mongoose.Schema({
  isCorrectAnswer: Boolean,
  text: String,
});

const questionSchema = mongoose.Schema({
  anagramType: String,
  blocks: [blocksOption],
  solution: String,
  title: String,
  type: String,
});

const Question = mongoose.model("question", questionSchema);

module.exports = Question;

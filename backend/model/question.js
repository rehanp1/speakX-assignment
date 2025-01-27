const mongoose = require("mongoose");

const blocksOption = mongoose.Schema({
  isCorrectAnswer: Boolean,
  showInOption: Boolean,
  text: String,
});

const option = mongoose.Schema({
  isCorrectAnswer: Boolean,
  text: String,
});

const questionSchema = mongoose.Schema({
  anagramType: String,
  blocks: [blocksOption],
  options: [option],
  solution: String,
  title: String,
  type: String,
});

questionSchema.index({ title: "text" });

const Question = mongoose.model("question", questionSchema);

module.exports = Question;

const mongoose = require("mongoose");

const dbConnection = async (dbUrl) => {
  try {
    await mongoose.connect(dbUrl);
    console.log("DB Connected");
  } catch (err) {
    console.log("DB connection Error", err);
    process.exit(0);
  }
};

module.exports = dbConnection;

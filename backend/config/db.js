// server/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://isthisallitsgonnabe:goQ6GQsjvYd8v7WV@cluster0.v1fxg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;

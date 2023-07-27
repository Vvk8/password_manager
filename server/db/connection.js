const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const DB_URI = process.env.DATABASE;

// MongoDB Connection
const connectToMongoDB = async () => {
  try {
      await mongoose.connect(process.env.DATABASE);
  } catch (error) {
      console.error("Error while connecting to MongoDB:", error);
      process.exit(1);
  }
};


module.exports = {
 
  connectToMongoDB
};
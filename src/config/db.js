const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/livelink";
    
    await mongoose.connect(mongoUri);
    
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Database connection failure:", error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4,
    });

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    throw error;
  }
};

module.exports = connectDB;
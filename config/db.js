const mongoose = require("mongoose");

async function connectDB() {
  try {
    mongoose.set("strictQuery", true);

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      // clearly indicate missing configuration
      throw new Error('MONGODB_URI environment variable is not set');
    }

    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
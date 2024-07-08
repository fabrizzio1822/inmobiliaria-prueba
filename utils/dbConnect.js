import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const dbUri = process.env.DB_URI;

  if (!dbUri) {
    throw new Error("The `uri` parameter to `openUri()` must be a string, got 'undefined'. Check your environment variables.");
  }

  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default dbConnect;

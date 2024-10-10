import mongoose from "mongoose";

export const connect = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {});

    connection.on("error", () => {
      console.log("MongoDB connection error");
      process.exit();
    });
  } catch (err) {
    console.log("Something went wrong!", err);
  }
};

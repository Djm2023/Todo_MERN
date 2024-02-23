import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
mongoose.connect(process.env.MONGODB);

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "Error in connecting with the database")
);

db.once("open", function () {
  console.log("Successfully connected to the MongoDB Database");
});

export default db;

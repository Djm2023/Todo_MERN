import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://devjyotidgr2023:UDgvTyrIiAmqbQiB@cluster0.cevr5bf.mongodb.net/Todo_App?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "Error in connecting with the database")
);

db.once("open", function () {
  console.log("Successfully connected to the MongoDB Database");
});

export default db;

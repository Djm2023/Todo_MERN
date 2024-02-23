import express from "express";
import dotenv from "dotenv";
import indexRouter from "./routes/index.js";
import db from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
const port = 8000;

dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/", indexRouter);

app.listen(process.env.PORT || port, (err) => {
  if (err) {
    console.log("Error in firing the server", err);
  }
  console.log(
    `Server is up and running on PORT ::: ${process.env.PORT || port}`
  );
});

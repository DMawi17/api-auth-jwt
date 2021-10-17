import express from "express";
import authRoute from "./routes/user.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
const { connect, connection } = mongoose;

dotenv.config();

connect(process.env.MONGODB_URI);
connection.on("connected", () => console.log("DB connected"));

app.use(express.json());

app.use("/api/user", authRoute);
app.use("/api/post", authRoute);

app.listen(3000, () => console.log("Server up & running on 3000"));

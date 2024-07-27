import express from "express";
import path from "path";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // helps to parse url
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // server will accept request from this url
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth/", authRoutes);
app.use("/api/users/", userRoutes);

app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
});

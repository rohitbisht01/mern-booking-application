import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import mongoose from "mongoose";

import userRoutes from "./routes/users";
import myHotelRoutes from "./routes/my-hotels";
import authRoutes from "./routes/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
app.use("/api/my-hotels/", myHotelRoutes);

// Catch all route
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
});

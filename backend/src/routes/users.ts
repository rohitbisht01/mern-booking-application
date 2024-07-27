import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import jwt from "jsonwebtoken";
const router = express.Router();

// API => POST  /api/users/register
router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array(),
      });
    }
    try {
      const { email, password, firstName, lastName } = req.body;

      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      user = await User.create({
        email,
        password,
        firstName,
        lastName,
      });
      await user.save();

      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.status(201).json({
        message: "User registered",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Somthing went wrong",
      });
    }
  }
);

export default router;

import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../api - lib/middleware/mongo_connect";
import user from "../../../api - lib/models/user";
import nextConnect from "next-connect";
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

export default nextConnect<NextApiRequest, NextApiResponse>().post(
  async (req, res) => {
    // Connect to db
    await dbConnect();

    // Get props from req body
    const { email, username, password, passwordConfirm } = req.body;

    // check if username or email exists
    const usernameExists = await user.find({ username: username });
    const emailExists = await user.find({ email: email });
    if (usernameExists.length > 0 || emailExists.length > 0) {
      return res.status(409).json({
        error: "Username or email already exists",
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user and save to database
    const newUser = new user({
      username,
      email,
      password: hashedPassword,
      refreshTokens: [],
    });

    const accessToken = await JWT.sign({ username }, process.env.SECRET, {
      expiresIn: "30m",
    });

    const refreshToken = await JWT.sign({ username }, process.env.SECRET, {
      expiresIn: "45m",
    });

    newUser.save((err: string) => {
      if (err) return res.status(400).json({ error: err });
    });

    return res.json({
      accessToken,
      refreshToken,
    });
  }
);

import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../api - lib/middleware/mongo_connect";
import user from "../../../api - lib/models/user";
import nextConnect from "next-connect";
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

interface ReqBody {
  email: string;
  password: string;
}

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  // Connect to db
  await dbConnect();
  const { email, password }: ReqBody = req.body;

  // Search database for user email
  const loggedUser = await user.find({ email: email });
  if (user.length === 0) {
    return res.status(401).json({
      error: "User does not exist!",
    });
  }

  // Compares hashed password to input password
  const passwordMatch = await bcrypt.compare(password, loggedUser[0].password);

  if (!passwordMatch) {
    return res.status(401).json({
      error: "Password does not match!",
    });
  }

  // Send Access Token to Client
  const accessToken = await JWT.sign(
    { username: loggedUser[0].username, id: loggedUser[0]._id },
    process.env.SECRET,
    {
      expiresIn: "30m",
    }
  );

  // Send Refresh Token to Client
  const refreshToken = await JWT.sign(
    { username: loggedUser[0].username, id: loggedUser[0]._id },
    process.env.SECRET,
    {
      expiresIn: "45m",
    }
  );

  // Push refresh token into user token array

  res.status(200).json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    message: "Successfully Logged In!",
  });
});

export default handler;

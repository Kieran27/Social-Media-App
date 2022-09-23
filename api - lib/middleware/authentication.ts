import next, { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
const JWT = require("jsonwebtoken");

import nextConnect, { NextHandler } from "next-connect";

const handler = nextConnect();

export const authenticate = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const token = req.headers.authorization;

  // If token not found, send error message
  if (!token) {
    res.status(401).json({ error: "Token not found!" });
  }
  // Authenticate token
  try {
    const user = await JWT.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid Token" });
  }
};

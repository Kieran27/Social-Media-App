import { NextApiRequest, NextApiResponse } from "next";
const JWT = require("jsonwebtoken");

export const authenticate = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const token = req.headers.authorization;

  // If token not found, send error message
  if (!token) {
    return res.status(401).json({ error: "Token not found!" });
  }
  // Authenticate token
  try {
    const user = await JWT.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid Token" });
  }
};

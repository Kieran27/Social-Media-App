import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../../../api - lib/middleware/authentication";
import dbConnect from "../../../api - lib/middleware/mongo_connect";
import user from "../../../api - lib/models/user";
import nextConnect from "next-connect";

interface ReqBody {
  email: string;
  password: string;
}

const handler = nextConnect();

handler.use(authenticate);

export default handler;

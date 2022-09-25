import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../../../../api - lib/middleware/authentication";
import dbConnect from "../../../../api - lib/middleware/mongo_connect";
import post from "../../../../api - lib/models/post";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  // Connect to db
  await dbConnect();
  return res.json({ puffin: "asmr" });
});

export default handler;

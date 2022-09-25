import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../../../../api - lib/middleware/authentication";
import dbConnect from "../../../../api - lib/middleware/mongo_connect";
import post from "../../../../api - lib/models/post";
import user from "../../../../api - lib/models/user";
import comment from "../../../../api - lib/models/comment";
import nextConnect from "next-connect";

const handler = nextConnect();

handler
  .use(authenticate)
  // Get User Profile Information
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    // Connect to db
    await dbConnect();

    // Get user_id and query db
    const query = req.query;
    const { user_id } = query;

    try {
      const userProfile = await post
        .findById(user_id)
        .populate({ path: "author", model: user, select: "username" })
        .populate({ path: "comments", model: comment });

      res.json({ post: userProfile });
    } catch (error) {
      res.status(409).json({ error });
    }
  });

export default handler;

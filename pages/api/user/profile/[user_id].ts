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

    // Query user info
    try {
      const userProfile = await user
        .findById(user_id)
        .select("username friends");

      // Query all posts and comments that correspond to user id
      const userPosts = await post.find({ author: user_id }).select("_id");
      const userComments = await comment
        .find({ author: user_id })
        .select("_id");

      res.json({ userProfile, userPosts, userComments });
    } catch (error) {
      res.status(409).json({ error });
    }
  });

export default handler;

import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../api - lib/middleware/mongo_connect";
import post from "../../../api - lib/models/post";
import comment from "../../../api - lib/models/comment";
import nextConnect from "next-connect";

export default nextConnect<NextApiRequest, NextApiResponse>().delete(
  async (req, res) => {
    // Connect to db
    await dbConnect();

    // Get post_id and query db
    const query = req.query;
    const { post_id } = query;

    try {
      await post.findByIdAndDelete(post_id);

      // Find and delete all comments with corresponding postId
      await comment.deleteMany({ postId: post_id });

      res.json({ message: "Post Deleted!" });
    } catch (error) {
      res.status(409).json({ error });
    }
  }
);

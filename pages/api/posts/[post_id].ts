import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../../../api - lib/middleware/authentication";
import dbConnect from "../../../api - lib/middleware/mongo_connect";
import post from "../../../api - lib/models/post";
import user from "../../../api - lib/models/user";
import comment from "../../../api - lib/models/comment";
import nextConnect from "next-connect";

const handler = nextConnect();

handler
  .use(authenticate)
  // Get Individual Post
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    // Connect to db
    await dbConnect();

    // Get post_id and query db
    const query = req.query;
    const { post_id } = query;

    try {
      const returnedPost = await post
        .findById(post_id)
        .populate({ path: "author", model: user, select: "username" })
        .populate({ path: "comments", model: comment });

      res.json({ post: returnedPost });
    } catch (error) {
      res.status(409).json({ error });
    }
  })
  // Delete Individual Post
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    // Connect to db
    await dbConnect();

    // Get post_id and query db
    const query = req.query;
    const { post_id } = query;

    // Get user_id from req.body
    const { user_id } = req.body;

    try {
      await post.findByIdAndDelete(post_id);

      // Find and delete all comments with corresponding postId
      await comment.deleteMany({ postId: post_id });

      // Find and delete post_id from user's posts array
      await user.findByIdAndUpdate(user_id, {
        $pull: { posts: post_id },
      });

      res.json({ message: `Post ${post_id} Deleted!` });
    } catch (error) {
      res.status(409).json({ error });
    }
  })
  // Update Individual Post
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    // Connect to db
    await dbConnect();

    // Validate and sanitize

    // Get post_id and query db
    const query = req.query;
    const { post_id } = query;
    const { content } = req.body;

    // Update post
    try {
      const updatedResult = await post.findByIdAndUpdate(post_id, {
        content: content,
        lastUpdatedAt: new Date().toISOString(),
      });
      res.json({ updatedResult });
    } catch (error) {
      res.json({ error });
    }
  });

export default handler;

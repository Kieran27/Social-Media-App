import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../../../../api - lib/middleware/authentication";
import dbConnect from "../../../../api - lib/middleware/mongo_connect";
import post from "../../../../api - lib/models/post";
import nextConnect from "next-connect";
import comment from "../../../../api - lib/models/comment";
import user from "../../../../api - lib/models/user";

const handler = nextConnect();

handler
  .use(authenticate)
  // Update selected comment
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    // Connect to db
    await dbConnect();

    // Query post_id and comment_id from req params
    const query = req.query;
    const { comment_id } = query;

    // Get updated content and user_id from req body
    const { content } = req.body;

    // Update comment with updated content and updated timestamp
    try {
      const updatedComment = comment.findByIdAndUpdate(
        comment_id,
        {
          content: content,
          lastUpdatedAt: new Date().toISOString(),
        },
        async (error: any, updatedComment: any) => {
          if (error) {
            throw new Error(error);
          }
          return res.status(200).json({ newComment: updatedComment });
        }
      );
    } catch (error) {
      return res.status(409).json({ error });
    }
  })

  // Delete selected comment
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    // Connect to db
    await dbConnect();
    // Validate req body

    // Query post_id from req params
    const query = req.query;
    const { post_id, comment_id } = query;

    // Get user_id from req.body
    const { user_id } = req.body;

    // Delete comment and remove comment id from user's comments array and posts comments array
    try {
      await comment.findByIdAndDelete(comment_id);
      await user.findByIdAndUpdate(user_id, {
        $pull: { comments: comment_id },
      });
      await post.findByIdAndUpdate(post_id, {
        $pull: { comments: comment_id },
      });
      return res.status(200).json({ message: `Comment ${comment_id} Deleted` });
    } catch (error) {
      return res.status(409).json({ error });
    }
  });

export default handler;

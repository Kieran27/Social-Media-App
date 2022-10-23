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
  // Get all base comments of post
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    // Connect to db
    await dbConnect();

    // Query post_id from req params
    const query = req.query;
    const { post_id } = query;

    comment
      .find({ postId: post_id, parent: "none" })
      .sort({ timestamp: "descending" })
      .populate({ path: "author", model: user, select: "username" })
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        return res.json({ comments: data });
      });
  })

  // Create new comment

  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    // Connect to db
    await dbConnect();
    // Validate req body

    // Query post_id from req params
    const query = req.query;
    const { post_id } = query;

    // Get params from req.body
    const { content, user_id, commentId } = req.body;

    // Create new comment, grab its id within callback
    // If req body included commentId add new Id to comment's replies array
    // Add new comment id to original post's comments array
    try {
      const newComment = comment.create(
        {
          author: user_id,
          content: content,
          lastUpdatedAt: new Date().toISOString(),
          timestamp: new Date().toISOString(),
          postId: post_id,
          replies: [],
          parent: commentId ? "comment" : "none",
        },
        async (error: any, newComment: any) => {
          if (error) {
            throw new Error(error);
          }
          const newlyCreatedCommentId = newComment._id;
          // If commentId add id to parent
          if (commentId) {
            await comment.findByIdAndUpdate(commentId, {
              $push: { replies: newlyCreatedCommentId },
            });
          }
          // Add newlyCreatedCommentId to original post's comment array
          await post.findByIdAndUpdate(post_id, {
            $push: { comments: newlyCreatedCommentId },
          });

          return res.status(201).json({ newComment: comment });
        }
      );
    } catch (error) {
      return res.status(409).json({ error });
    }
  });

export default handler;

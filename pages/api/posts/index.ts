import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../../../api - lib/middleware/authentication";
import dbConnect from "../../../api - lib/middleware/mongo_connect";
import post from "../../../api - lib/models/post";
import user from "../../../api - lib/models/user";
import nextConnect from "next-connect";
import comment from "../../../api - lib/models/comment";

const handler = nextConnect();

handler
  .use(authenticate)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    // Connect to db
    await dbConnect();
    // Query database to find posts and return as JSON
    /*
    Extra -- Find Posts whose author ID matches User Id and posts
    that user is friends with
    */
    post
      .find()
      .sort({ timestamp: "descending" })
      .populate({ path: "author", model: user, select: "username" })
      .populate({ path: "comments", model: comment })
      .exec((err, data) => {
        if (err) {
          return res.status(404).json({ error: err });
        }
        return res.json({ posts: data });
      });
  })

  // Create New Post

  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    // Connect to db
    await dbConnect();
    // Validate req body
    const { content, user_id } = req.body;

    if (!user_id) {
      return res.status(409).json({ error: "Something went wrong..." });
    }
    // Create newPost and update db
    try {
      const newPost = await post.create(
        {
          author: user_id,
          content: content,
          lastUpdatedAt: new Date().toISOString(),
          timestamp: new Date().toISOString(),
        },
        async (error: any, post: any) => {
          if (error) {
            throw new Error(error);
          }
          const newlyCreatedPostId = post._id;
          // Add newlyCreatedPostId to user's post array
          await user.findByIdAndUpdate(user_id, {
            $push: { posts: newlyCreatedPostId },
          });
          return res.status(201).json({ newPost: post });
        }
      );
    } catch (error) {
      return res.status(409).json({ error });
    }
  });

export default handler;

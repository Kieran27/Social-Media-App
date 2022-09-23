import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../../../api - lib/middleware/authentication";
import dbConnect from "../../../api - lib/middleware/mongo_connect";
import post from "../../../api - lib/models/post";
import nextConnect from "next-connect";

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
      .populate("users")
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
    console.log(content, user_id);
    try {
      const newPost = post.create({
        author: user_id,
        content: content,
        timestamp: new Date().toISOString(),
      });
      return res.status(200).json({ newPost: newPost });
    } catch (error) {
      return res.status(409).json({ error });
    }
  });

export default handler;

import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../../../api - lib/middleware/authentication";
import dbConnect from "../../../api - lib/middleware/mongo_connect";
import post from "../../../api - lib/models/post";
import user from "../../../api - lib/models/user";
import nextConnect from "next-connect";
import jwt_decode from "jwt-decode";
import { TToken } from "../../../frontend - lib/types";
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
    // Decode token to get user_id
    const token = req.headers.authorization;
    // If token not found, send error message
    if (!token) {
      return res.status(401).json({ error: "Token not found!" });
    }
    const { id } = jwt_decode<TToken>(token);

    try {
      // Get user details from id and filter for friends array
      const friends = await user.findById(id).select("friends -_id");
      // Mutate returned friendsArray by spreading and adding user id
      const newFriends = [...friends.friends, id];

      const posts = await post
        /* 
        Search for posts in which the author belongs to
        either user or one of user's friends
      */
        .find({ author: { $in: newFriends } })
        .sort({ timestamp: "descending" })
        .populate({ path: "author", model: user, select: "username" });
      return res.json({ posts });
    } catch (error) {
      return res.status(404).json({ error });
    }
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
      const newPost = await post.create({
        author: user_id,
        content: content,
        lastUpdatedAt: new Date().toISOString(),
        timestamp: new Date().toISOString(),
      });
      return res.status(201).json({ newPost: post });
    } catch (error) {
      return res.status(409).json({ error });
    }
  });

export default handler;

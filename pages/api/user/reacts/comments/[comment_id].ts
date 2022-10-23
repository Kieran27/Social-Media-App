import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../../../../../api - lib/middleware/authentication";
import dbConnect from "../../../../../api - lib/middleware/mongo_connect";
import nextConnect from "next-connect";
import comment from "../../../../../api - lib/models/comment";
import { TToken } from "../../../../../frontend - lib/types";
import jwt_decode from "jwt-decode";

const handler = nextConnect();

handler
  .use(authenticate)
  // Handle Liking Posts
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    // Connect to db
    await dbConnect();

    // Query comment_id from req params
    const query = req.query;
    const { comment_id } = query;

    // Decode token to get user_id
    const token = req.headers.authorization;
    // If token not found, send error message
    if (!token) {
      return res.status(401).json({ error: "Token not found!" });
    }
    const { id } = jwt_decode<TToken>(token);

    // Check if userId exists
    if (!id) {
      throw new Error("No User Id Provided!");
    }

    // Get selectedPost and return likes array
    try {
      const selectedPost = await comment.findById(comment_id);
      const likesArray: string[] = selectedPost.likes;

      // Check if user_id exists within likes array and react accordingly
      const userIdExists: boolean = likesArray.includes(id);

      // If id exists - remove id from array and update in db
      if (userIdExists) {
        const updatedPost = await comment.findByIdAndUpdate(comment_id, {
          $pull: { likes: id },
        });

        return res.status(200).json({ updatedPost });
      } else {
        // If id doesn't exist - add id to end of array and update post
        const updatedLikesArray = [...likesArray, id];

        const updatedPost = await comment.findByIdAndUpdate(comment_id, {
          likes: updatedLikesArray,
        });

        return res.status(200).json({ updatedPost });
      }
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" });
    }
  });

export default handler;

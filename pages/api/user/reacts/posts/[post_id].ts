import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../../../../../api - lib/middleware/authentication";
import dbConnect from "../../../../../api - lib/middleware/mongo_connect";
import nextConnect from "next-connect";
import post from "../../../../../api - lib/models/post";

const handler = nextConnect();

handler
  .use(authenticate)
  // Handle Liking Posts
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    // Connect to db
    await dbConnect();

    // Query post_id from req params
    const query = req.query;
    const { post_id } = query;
    const { user_id } = req.body;

    // Check if userId exists
    if (!user_id) {
      throw new Error("No User Id Provided!");
    }

    // Get selectedPost and return likes array
    try {
      const selectedPost = await post.findById(post_id);
      const likesArray = selectedPost[0].likes;

      // Check if user_id exists within likes array and react accordingly
      const userIdExists = likesArray.includes(user_id);

      // If id exists - remove id from array and update in db
      if (userIdExists) {
        const filteredLikesArray = likesArray.filter(
          (userId: string[]) => userId !== user_id
        );

        const updatedPost = await post.findByIdAndUpdate(post_id, {
          likes: filteredLikesArray,
        });

        return res.status(200).json({ updatedPost });
      } else {
        // If id doesn't exist - add id to end of array and update post
        const updatedLikesArray = [...likesArray, user_id];

        const updatedPost = await post.findByIdAndUpdate(post_id, {
          likes: updatedLikesArray,
        });

        return res.status(200).json({ updatedPost });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  });

export default handler;

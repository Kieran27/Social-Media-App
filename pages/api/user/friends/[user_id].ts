import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../../../../api - lib/middleware/authentication";
import dbConnect from "../../../../api - lib/middleware/mongo_connect";
import user from "../../../../api - lib/models/user";
import nextConnect from "next-connect";

const handler = nextConnect();

handler
  .use(authenticate)
  // Get all friend requests of current user
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    // Connect to db
    await dbConnect();

    // Query user_id from req params
    const query = req.query;
    const { user_id } = query;

    // Query userdata from db and filter for friend requests
    try {
      const friendRequests = await user
        .findById(user_id)
        .select("friendRequests")
        .populate({
          path: "friendRequests",
          model: user,
          select: "username email",
        });

      res.json({ friendRequests });
    } catch (error) {
      res.status(409).json({ error });
    }
  })
  // Send a friend request
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    // Connect to db
    await dbConnect();

    // Query user_id from req params
    const query = req.query;
    const { user_id } = query;

    // Query selected userId from req.body
    const { friend_id } = req.body;

    // Find friend in db and update friend requests array with user_id
    try {
      const potentialFriend = await user.findByIdAndUpdate(friend_id, {
        $push: { friendRequests: [user_id] },
      });

      return res.status(200).json({ msg: "Friend Request Successful!" });
    } catch (error) {
      return res.status(409).json({ error });
    }
  })
  // Delete friend request
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    // Connect to db
    await dbConnect();

    // Query user_id from req params
    const query = req.query;
    const { user_id } = query;

    // Query selected userId from req.body
    const { friend_id } = req.body;

    // Find friend in db and update friend requests array by removing friend_id
    try {
      await user.findByIdAndUpdate(user_id, {
        $pull: { friendRequests: friend_id },
      });

      return res.status(200).json({ msg: "Friend Request Deleted!" });
    } catch (error) {
      return res.status(409).json({ error });
    }
  })
  // Accept friend request
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    // Connect to db
    await dbConnect();

    // Query user_id from req params
    const query = req.query;
    const { user_id } = query;

    // Query selected userId from req.body
    const { friend_id } = req.body;

    /* 
    Update user's friends array and friendRequests Array
    Push friend_id into friend's array
    Pull friend_id from friendRequestsArray
    */
    try {
      await user.findByIdAndUpdate(user_id, {
        $push: { friends: [friend_id] },
        $pull: { friendRequests: friend_id },
      });

      return res.status(200).json({ msg: "Friend Request Accepted!" });
    } catch (error) {
      return res.status(409).json({ error });
    }
  });

export default handler;

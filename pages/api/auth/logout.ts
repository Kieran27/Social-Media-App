import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../api - lib/middleware/mongo_connect";
import user from "../../../api - lib/models/user";
import nextConnect from "next-connect";

export default nextConnect<NextApiRequest, NextApiResponse>().post(
  async (req, res) => {
    // Connect to db
    await dbConnect();

    // Get refreshToken
    const refreshToken: string | undefined = req.headers.authorization;
    // Search database where username = username model
    const loggedOutUser = await user.findOneAndUpdate(
      { refreshTokens: refreshToken },
      { $pull: { refreshTokens: { $in: [refreshToken] } } }
    );

    // Send status back to user notifying them of being logged out
    return res.json({
      msg: "Logged out successfully!",
    });
  }
);

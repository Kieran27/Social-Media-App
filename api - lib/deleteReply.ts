import dbConnect from "./middleware/mongo_connect";
import post from "./models/post";
import nextConnect from "next-connect";
import comment from "./models/comment";
import user from "./models/user";

const deleteReply = ( replyId: string, userId: string) => {
  comment.findById(replyId).select("replies")      .exec((err, data) => {
    // Recusively call delete function until all child comments are deleted
    return res.json({ comments: data });
  });

  };
};

export default deleteReply;

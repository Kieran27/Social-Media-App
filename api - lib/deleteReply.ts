import comment from "./models/comment";

const deleteReply = async (replyId: string, userId: string) => {
  const repliesArray = await comment.findById(replyId).select("replies -_id");
  if (repliesArray.length > 0) {
    repliesArray.forEach((replyId: string) => {
      deleteReply(replyId, userId);
    });
    await comment.findByIdAndDelete(replyId);
  }
  return await comment.findByIdAndDelete(replyId);
};

export default deleteReply;

import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "users" },
  content: { type: String, minLength: 1, maxLength: 1500, required: true },
  likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now() },
  postId: { type: String },
});

export default mongoose.models.comments ||
  mongoose.model("comments", CommentSchema);

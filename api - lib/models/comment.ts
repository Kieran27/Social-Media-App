import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "users" },
  content: { type: String, minLength: 1, maxLength: 750, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "users", default: 0 }],
  lastUpdatedAt: { type: Date, default: new Date().toISOString() },
  timestamp: { type: Date, default: Date.now() },
  postId: { type: String },
});

export default mongoose.models.comments ||
  mongoose.model("comments", CommentSchema);

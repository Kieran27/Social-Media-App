import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "users" },
  content: { type: String, minLength: 1, maxLength: 1500, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "users", default: 0 }],
  lastUpdatedAt: { type: Date, default: Date.now() },
  timestamp: { type: Date, default: Date.now() },
  comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
});

export default mongoose.models.posts || mongoose.model("posts", PostSchema);

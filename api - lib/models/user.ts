import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, maxlength: 40, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImg: { type: String },
  friends: [{ type: Schema.Types.ObjectId, ref: "users" }],
  friendRequests: [{ type: Schema.Types.ObjectId, ref: "users" }],
  joinedOn: { type: String, default: new Date().toISOString() },
});

export default mongoose.models.users || mongoose.model("users", UserSchema);

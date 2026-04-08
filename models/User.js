import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: "",
  },
  special: {
    type: String,
    default: "",
  },
  fullName: {
    type: String,
    default: "",
  },
  ratings: [{
    type: String,
    default: []
  }],
  isTherapist: {
    type: Boolean,
    default: false,
  },
  chats: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
    default: [],
  },
  socketId:{
    type: String,
    default: "",
  }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

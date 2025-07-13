import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  pro_pic: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);

export default User;

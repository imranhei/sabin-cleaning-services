import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      minlength: 2,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    msg: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;

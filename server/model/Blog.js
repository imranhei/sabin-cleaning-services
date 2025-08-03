import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    doc: {
      type: mongoose.Schema.Types.Mixed,
    },
    gallery: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);

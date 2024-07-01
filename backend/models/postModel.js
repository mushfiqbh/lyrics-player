import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  pathname: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  author: {
    type: Object,
    required: true,
  },
  reviewer: {
    type: Object,
  },
  content: {
    type: String,
    required: true,
  },
  sources: {
    type: Array,
  },
  image: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now().toString(),
  },
});

const postModel = mongoose.models.post || mongoose.model("post", postSchema);
export default postModel;

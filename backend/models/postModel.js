import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  label: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  author: {
    type: Object,
    required: true,
  },
  content: {
    type: String,
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
  adminChoice: {
    type: Boolean,
    default: "false",
  },
  date: {
    type: Date,
    default: Date.now().toString(),
  },
});

const postModel = mongoose.models.post || mongoose.model("post", postSchema);
export default postModel;

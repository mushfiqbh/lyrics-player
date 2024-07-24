import mongoose from "mongoose";

const authorSchema = mongoose.Schema({
  title: String,
  pathname: String,
  name: String,
  bio: String,
});

const authorModel = mongoose.models.author || mongoose.model("author", authorSchema);
export default authorModel;

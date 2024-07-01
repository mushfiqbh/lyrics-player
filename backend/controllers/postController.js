import postModel from "../models/postModel.js";
import catalogModel from "../models/catalogModel.js";

const createPost = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const newPost = new postModel({
    pathname: req.body.pathname,
    title: req.body.title,
    label: req.body.label,
    caption: req.body.caption,
    author: req.body.author,
    reviewer: req.body.reviewer,
    content: req.body.content,
    sources: req.body.sources,
    image: image_filename,
    date: req.body.date,
  });

  try {
    const response = await newPost.save();
    
    const catalog = await catalogModel.findOne({ label: req.body.label });
    catalog.postIds.push(response._id);
    await catalogModel.findByIdAndUpdate(catalog._id, catalog);

    res.json({ success: true, message: "Post Created" });
  } catch (error) {
    res.json({ succes: false, message: "Error Creating Post" });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await postModel.findByIdAndUpdate(id, req.body);
    const updatedPost = await postModel.findById(id);
    res.status(200).json({ message: "Post Updated", data: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
};

const getPost = async (req, res) => {
  try {
    const posts = await postModel.find({});
    res.json({ success: true, data: posts });
  } catch (error) {
    ews.json({ success: false, message: "Error Occurred" });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await postModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Post Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Post", error });
  }
};

export { createPost, updatePost, getPost, deletePost };

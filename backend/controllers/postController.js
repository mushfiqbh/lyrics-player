import postModel from "../models/postModel.js";
import fs from "fs";

const createPost = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const newPost = new postModel({
    title: req.body.title,
    label: req.body.label,
    subtitle: req.body.subtitle,
    author: JSON.parse(req.body.author),
    content: req.body.content,
    sources: JSON.parse(req.body.sources),
    image: image_filename,
    date: req.body.date,
  });

  try {
    await newPost.save();
    res.json({ success: true, message: "Post Created" });
  } catch (error) {
    res.json({ success: false, message: "Error Creating Post", error });
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

const incrementPost = async (req, res) => {
  const { id } = req.params;

  try {
    if (
      Object.keys(req.body).length !== 1 &&
      !Object.keys(req.body).includes("$inc")
    ) {
      return res.status(405).json({ message: "Invalid Request" });
    }

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

const getPostList = async (req, res) => {
  try {
    const posts = await postModel.find({});
    res.json({ success: true, data: posts });
  } catch (error) {
    res.json({ success: false, message: "Error Occurred" });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    res.json({ success: false, message: "Error Occurred" });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    fs.unlink(`uploads/${post.image}`, () => {});
    await postModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Post Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Post", error });
  }
};

export {
  createPost,
  updatePost,
  getPostList,
  deletePost,
  getPost,
  incrementPost,
};

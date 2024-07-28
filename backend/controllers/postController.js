import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";

const createPost = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const post_label = req.body.label.split(" ").join("-");

  const newPost = new postModel({
    title: req.body.title,
    label: post_label,
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

    const updatedPost = await postModel.findByIdAndUpdate(id, req.body);
    res.status(200).json({ success: true, message: "Post Updated" });
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

    const permit = await userModel.findById(req.body.userId);
    if (!permit.permission.includes("deletePost")) {
      return res.status(401).json({ message: "Permission Denied" });
    }

    fs.unlink(`uploads/${post.image}`, () => {});
    await postModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Post Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Post", error });
  }
};

const postList = async (req, res) => {
  try {
    const posts = await postModel.find({});
    res.json({ success: true, data: posts });
  } catch (error) {
    res.json({ success: false, message: "Error Occurred" });
  }
};

export { createPost, updatePost, incrementPost, getPost, deletePost, postList };

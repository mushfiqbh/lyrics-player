import express from "express";
import multer from "multer";
import {
  createPost,
  updatePost,
  getPost,
  deletePost,
} from "../controllers/postController.js";

const postRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    return callback(null, `${req.body.pathname}`);
  },
});

const upload = multer({
  storage,
});

postRouter.get("/index", getPost);
postRouter.post("/create", upload.single("image"), createPost);
postRouter.put("/update/:id", updatePost);
postRouter.delete("/delete/:id", deletePost);

export default postRouter;

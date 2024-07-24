import express from "express";
import multer from "multer";
import {
  createPost,
  updatePost,
  getPostList,
  getPost,
  deletePost,
  incrementPost,
} from "../controllers/postController.js";
import authMiddleware from "../middleware/auth.js";

const postRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

postRouter.get("/index", getPostList);
postRouter.get("/get/:id", getPost);
postRouter.post("/create", authMiddleware, upload.single("image"), createPost);
postRouter.put("/update/:id", authMiddleware, updatePost);
postRouter.put("/increment/:id", incrementPost);
postRouter.delete("/delete/:id", authMiddleware, deletePost);

export default postRouter;

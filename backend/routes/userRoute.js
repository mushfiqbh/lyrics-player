import express from "express";
import {
  getUserInfo,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.get("/userinfo", authMiddleware, getUserInfo);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;

import express from "express";
import {
  getUserInfo,
  loginUser,
  registerUser,
  deleteAccount,
  updateUserInfo,
  updateUserInfoByOwner,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/userinfo", authMiddleware, getUserInfo);
userRouter.post("/delete", authMiddleware, deleteAccount);
userRouter.put("/update/", authMiddleware, updateUserInfo);
userRouter.put("/update/:targetId", authMiddleware, updateUserInfoByOwner);

export default userRouter;

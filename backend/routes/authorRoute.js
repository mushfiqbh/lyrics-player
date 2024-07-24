import express from "express";
import { authorList, addAuthor } from "../controllers/authorController.js";
import authMiddleware from "../middleware/auth.js";
const authorRouter = express.Router();

authorRouter.get("/index", authorList);
authorRouter.post("/addauthor", authMiddleware, addAuthor);

export default authorRouter;

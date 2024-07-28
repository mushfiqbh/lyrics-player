import express from "express";
import authMiddleware from "../middleware/auth.js";
import { authorList, addAuthor } from "../controllers/authorController.js";
const authorRouter = express.Router();

authorRouter.get("/index", authorList);
authorRouter.post("/addauthor", authMiddleware, addAuthor);

export default authorRouter;

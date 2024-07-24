import express from "express";
import {
  createCatalog,
  getCatalog,
  updateCatalog,
  deleteCatalog,
  catalogList,
} from "../controllers/catalogController.js";
import authMiddleware from "../middleware/auth.js";

const catalogRouter = express.Router();

catalogRouter.get("/get/:id", getCatalog);
catalogRouter.get("/index", catalogList);
catalogRouter.post("/create", authMiddleware, createCatalog);
catalogRouter.put("/update/:id", authMiddleware, updateCatalog);
catalogRouter.delete("/delete/:id", authMiddleware, deleteCatalog);

export default catalogRouter;

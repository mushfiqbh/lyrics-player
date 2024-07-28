import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  createCatalog,
  getCatalog,
  updateCatalog,
  deleteCatalog,
  catalogList,
} from "../controllers/catalogController.js";
const catalogRouter = express.Router();

catalogRouter.get("/index", catalogList);
catalogRouter.get("/get/:id", getCatalog);
catalogRouter.post("/create", authMiddleware, createCatalog);
catalogRouter.put("/update/:id", authMiddleware, updateCatalog);
catalogRouter.delete("/delete/:id", authMiddleware, deleteCatalog);

export default catalogRouter;

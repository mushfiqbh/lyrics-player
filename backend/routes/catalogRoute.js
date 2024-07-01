import express from "express";
import {
  createCatalog,
  getCatalog,
  updateCatalog,
  deleteCatalog,
} from "../controllers/catalogController.js";

const catalogRouter = express.Router();

catalogRouter.get("/index", getCatalog);
catalogRouter.post("/create", createCatalog);
catalogRouter.put("/update/:id", updateCatalog);
catalogRouter.delete("/delete/:id", deleteCatalog);

export default catalogRouter;

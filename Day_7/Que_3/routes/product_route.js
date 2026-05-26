import express from "express";
import { createProduct, getAllProducts, getProductById } from "../controllers/product_controller.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", createProduct);

export default productRouter;
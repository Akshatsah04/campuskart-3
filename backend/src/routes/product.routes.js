import express from "express";

import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { createProductValidator } from "../validators/product.validator.js";
import { validate } from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post("/", protect, createProductValidator, validate, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
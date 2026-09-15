import express from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    getMyProducts,
    updateProduct,
    updateProductStatus,
    deleteProduct
} from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createProductValidator } from "../validators/product.validator.js";
import { validate } from "../middlewares/validation.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/me", protect, getMyProducts);
router.get("/:id", getProductById);
router.post("/", protect, upload.array("images", 5), createProductValidator, validate, createProduct);
router.patch("/:id/status", protect, updateProductStatus);
router.patch("/:id", protect, upload.array("images", 5), updateProduct);
router.put("/:id", protect, upload.array("images", 5), updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
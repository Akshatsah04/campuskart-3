import { body } from "express-validator";

export const createProductValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Product title is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be between 3 and 100 characters"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Product description is required")
        .isLength({ min: 10, max: 1000 })
        .withMessage("Description must be between 10 and 1000 characters"),

    body("price")
        .notEmpty()
        .withMessage("Product price is required")
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number"),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Product category is required"),

    body("condition")
        .isIn(["New", "Like New", "Good", "Fair"])
        .withMessage("Invalid product condition")
];
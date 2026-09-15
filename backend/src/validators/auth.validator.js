import { body } from "express-validator";

export const registerValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 60 })
        .withMessage("Name must be between 2 and 60 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

    body("college")
        .optional()
        .trim(),

    body("branch")
        .trim()
        .notEmpty()
        .withMessage("Branch / Department is required"),

    body("year")
        .notEmpty()
        .withMessage("Academic year is required")
        .isInt({ min: 1, max: 6 })
        .withMessage("Year must be a valid number between 1 and 6"),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required for buyers to contact you")
        .matches(/^[+]?[0-9\s-]{10,15}$/)
        .withMessage("Please enter a valid phone number (10–15 digits)")
];

export const loginValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
];

export const updateProfileValidator = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 2, max: 60 })
        .withMessage("Name must be between 2 and 60 characters"),

    body("branch")
        .optional()
        .trim(),

    body("year")
        .optional()
        .isInt({ min: 1, max: 6 })
        .withMessage("Year must be between 1 and 6"),

    body("phone")
        .optional()
        .trim()
        .matches(/^[+]?[0-9\s-]{10,15}$/)
        .withMessage("Please enter a valid phone number")
];

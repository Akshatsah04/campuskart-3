import express from "express";
import {
    createUser,
    loginUser,
    getCurrentUser,
    updateUserProfile,
    getUserPublicProfile
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
    registerValidator,
    loginValidator,
    updateProfileValidator
} from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", registerValidator, validate, createUser);
router.post("/login", loginValidator, validate, loginUser);
router.get("/me", protect, getCurrentUser);
router.patch("/me", protect, updateProfileValidator, validate, updateUserProfile);
router.get("/:id", getUserPublicProfile);

export default router;
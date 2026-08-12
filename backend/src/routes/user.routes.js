import express from "express";

import {createUser,loginUser,getCurrentUser} from "../controllers/user.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/me", protect, getCurrentUser);

export default router;
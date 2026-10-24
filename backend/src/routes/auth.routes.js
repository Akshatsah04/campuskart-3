import express from "express";

import {
    startSignup,
    verifySignup
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup/start", startSignup);
router.post("/signup/verify", verifySignup);

export default router;
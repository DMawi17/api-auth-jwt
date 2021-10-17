import { Router } from "express";
import { signUp, login, post } from "../controllers/user.controller.js";
import verify from "../verifyToken.js"; // middleware is imported

const router = Router();

router.post("/register", signUp);
router.post("/login", login);
router.get("/", verify, post); // middleware add to make it private

export default router;

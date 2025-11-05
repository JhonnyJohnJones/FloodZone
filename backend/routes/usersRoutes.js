import express from "express";
import { UserController } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/", authMiddleware, UserController.getAll);
router.get("/:id", authMiddleware, UserController.getById);

export default router;
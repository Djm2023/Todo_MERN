import { Router } from "express";
import taskRoute from "./task.js";
const router = Router();
import {
  register,
  login,
  getMyDetails,
  logout,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getMyDetails);
router.get("/logout", isAuthenticated, logout);

router.use("/create", taskRoute);

export default router;

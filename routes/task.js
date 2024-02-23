import { Router } from "express";
const router = Router();
import {
  deleteMyTask,
  getMyTask,
  newTask,
  updateMyTask,
} from "../controllers/taskController.js";
import { isAuthenticated } from "../middlewares/auth.js";

router.post("/new-task", isAuthenticated, newTask);

router.get("/alltask", isAuthenticated, getMyTask);

router.put("/:id", isAuthenticated, updateMyTask);
router.delete("/:id", isAuthenticated, deleteMyTask);

export default router;

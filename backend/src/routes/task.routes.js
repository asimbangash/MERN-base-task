import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";

const router = Router();

router.route("/addtask").post(createTask);
router.route("/gettasks").get(getTasks);
router.route("/updateTask/:id").put(updateTask);
router.route("/deleteTask/:id").delete(deleteTask);

export default router;

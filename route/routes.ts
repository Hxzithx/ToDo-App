import { Router } from "express";
import{
    getAllTask,
    addTask,
    updateTask,
    deleteTask
} from "../controller/taskController";

const router = Router();

router.get("/tasks",getAllTask);
router.post("/tasks",addTask);
router.put("/task/:id",updateTask);
router.delete("/task/:id",deleteTask);

export default router;
import { Router } from "express";
import{
    getAllTask,
    addTask,
    updateTask,
    deleteTask,
    getHistory
} from "../controller/taskController";

const router = Router();

router.get("/tasks",getAllTask);
router.post("/tasks",addTask);
router.put("/tasks/:id",updateTask);
router.delete("/tasks/:id",deleteTask);
router.get("/tasks/history",getHistory);

export default router;
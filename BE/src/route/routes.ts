import { Router } from "express";
import{
    getAllTask,
    saveTask,
    updateTask,
    deleteTask,
    getHistory
} from "../controller/taskController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/tasks",verifyToken,getAllTask);
router.post("/tasks",verifyToken,saveTask);
router.put("/tasks/:id",verifyToken,updateTask);
router.delete("/tasks/:id",verifyToken,deleteTask);
router.get("/tasks/history",verifyToken,getHistory);

export default router;
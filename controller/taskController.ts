import{
    getAllTasksfromDB,
    addTasktoDB,
    updateTaskinDB,
    deleteTaskinDB
} from "../data/store";

export const getAllTask = async (req : Request, res : Response) => {
    try{
       const tasks = await getAllTasksfromDB;
       res.status(200).json(tasks);
    }
    catch(error){
       res.status(500).json({message : "Faild to fetch task"});
    }
}
import { Request, Response } from "express";
import{
    getTasksByUser,
    addTasktoDB,
    updateTaskinDB,
    deleteTaskinDB,
    getTaskHistoryFromDB
} from "../data/store";

export const getAllTask = async (req : any, res : Response) => {
    try{
        const userID = req.user.uid;
       const tasks = await getTasksByUser(userID);
       res.status(200).json(tasks);
    }
    catch(error){
       res.status(500).json({message : "Faild to fetch task"});
    }
};

//add
export const addTask = async (req : Request,res : Response ) => {
    try{
    const { title } = req.body;

     if(!title || typeof title!== "string"){
        return res.status(400).json({message : "Task Name is Required"});
     }
     const newTask = await addTasktoDB(title);
     res.status(201).json(newTask);
    }
    catch(error){
        res.status(500).json({message : "Failed to Create Task"});
    }
};

//update completed or not 
export const updateTask = async (req : Request, res : Response) => {
    try{
        const id = Number(req.params.id);
        const { completed } = req.body;
        if(isNaN(id)){
           return res.status(400).json({message : "Invalid Task ID"});
        }
        if(typeof completed !== "boolean"){
            return res.status(400).json({message : "Must be a boolean"});
        }
        await updateTaskinDB(id,completed);
        res.status(200).json({message : "Task updated successfully"});
    }
    catch(error){
       res.status(500).json({message : "Failed to update task"});
    }
};

//delete
export const deleteTask = async(req : Request, res : Response) =>{
    try{
      const id = Number(req.params.id);

      if(isNaN(id)){
        return res.status(400).json({message : "Invalid Task ID"});
      }
      await deleteTaskinDB(id);
      res.status(200).json({message : "Task deleted succesfully"});
    }
    catch(error){
       res.status(500).json({message : "Failed to delete task"});
    }
};

//get history
export const getHistory = async(req : Request, res : Response) =>{
     try {
    const historyTasks = await getTaskHistoryFromDB();
    res.status(200).json(historyTasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch task history" });
  }
};
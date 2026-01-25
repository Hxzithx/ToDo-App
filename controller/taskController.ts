import { Request, Response } from "express";

import{
    getAllTasksfromDB,
    addTasktoDB,
    updateTaskinDB,
    deleteTaskinDB
} from "../data/store";

export const getAllTask = async (req : Request, res : Response) => {
    try{
       const tasks = await getAllTasksfromDB();
       res.status(200).json(tasks);
    }
    catch(error){
       res.status(500).json({message : "Faild to fetch task"});
    }
}

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
        res.status(500).json({message : "Failed to Create Task"})
    }
}
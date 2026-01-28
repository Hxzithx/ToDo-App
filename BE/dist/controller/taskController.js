"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistory = exports.deleteTask = exports.updateTask = exports.addTask = exports.getAllTask = void 0;
const store_1 = require("../data/store");
const getAllTask = async (req, res) => {
    try {
        const tasks = await (0, store_1.getAllTasksfromDB)();
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Faild to fetch task" });
    }
};
exports.getAllTask = getAllTask;
//add
const addTask = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title || typeof title !== "string") {
            return res.status(400).json({ message: "Task Name is Required" });
        }
        const newTask = await (0, store_1.addTasktoDB)(title);
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to Create Task" });
    }
};
exports.addTask = addTask;
//update completed or not 
const updateTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { completed } = req.body;
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid Task ID" });
        }
        if (typeof completed !== "boolean") {
            return res.status(400).json({ message: "Must be a boolean" });
        }
        await (0, store_1.updateTaskinDB)(id, completed);
        res.status(200).json({ message: "Task updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update task" });
    }
};
exports.updateTask = updateTask;
//delete
const deleteTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid Task ID" });
        }
        await (0, store_1.deleteTaskinDB)(id);
        res.status(200).json({ message: "Task deleted succesfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete task" });
    }
};
exports.deleteTask = deleteTask;
//get history
const getHistory = async (req, res) => {
    try {
        const historyTasks = await (0, store_1.getTaskHistoryFromDB)();
        res.status(200).json(historyTasks);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch task history" });
    }
};
exports.getHistory = getHistory;

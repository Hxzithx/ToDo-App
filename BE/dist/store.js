"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTasksfromDB = getAllTasksfromDB;
exports.addTasktoDB = addTasktoDB;
exports.updateTaskinDB = updateTaskinDB;
exports.deleteTaskinDB = deleteTaskinDB;
exports.getTaskHistoryFromDB = getTaskHistoryFromDB;
const db_1 = require("./BE/controller/data/db");
/*get tasks from db*/
async function getAllTasksfromDB() {
    const [rows] = await db_1.db.query("SELECT * FROM task ORDER BY created_at DESC");
    return rows;
}
/*add a task*/
async function addTasktoDB(title) {
    const [result] = await db_1.db.query("INSERT INTO task titles VALUES ?", [title]);
    const [rows] = await db_1.db.query("SELECT * FROM task WHERE id = ?"[result.insertId]);
    return rows[0];
}
/*update task complete or not*/
async function updateTaskinDB(id, completed) {
    await db_1.db.query("UPDATE task set completed = ? WHERE id = ?", [completed, id]);
}
/*delete task*/
async function deleteTaskinDB(id) {
    await db_1.db.query("DELETE FROM task WHERE id = ?", [id]);
}
//task history (get completed task for history)
async function getTaskHistoryFromDB() {
    const [rows] = await db_1.db.query("SELECT * FROM task WHERE completed = true ORDER BY created_at DESC");
    return rows;
}

import { db } from "../data/db";
import { Task } from "../models/taskModel";

/*get tasks from db*/
export async function getAllTasksfromDB() : Promise<Task[]> {
  const [rows] = await db.query<Task[]>(
    "SELECT * FROM task ORDER BY created_at DESC"
  );
  return rows;
}

/*add a task*/
export async function addTasktoDB(title:string) : Promise<Task[]> {
  const [result] : any = await db.query<Task[]>(
    "INSERT INTO task titles VALUES ?",
    [title]
  );
  const [rows] : any = await db.query<Task[]>(
    "SELECT * FROM task WHERE id = ?"
    [result.insertId]
  );
  return rows[0];
}

/*update task complete/ not*/
export async function updateTaskinDB(id:number,completed:boolean) : Promise<void> {
  await db.query(
    "UPDATE task set completed = ? WHERE id = ?",
    [completed,id]
  );
}

/*delete task*/
export async function deleteTaskinDB(id:number) : Promise<void> {
  await db.query("DELETE FROM task WHERE id = ?",[id]);
}
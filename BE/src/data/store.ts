import { db } from "./db";
import { Task } from "../models/taskModel";

/*get tasks for specific user*/
export async function getTasksByUser(userId: string): Promise<Task[]> {
  const [rows] = await db.query<Task[]>(
    "SELECT * FROM task WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );
  return rows;
}

/*add a task*/
export async function addTasktoDB(title:string,userID:string) : Promise<Task> {
  const [result] : any = await db.query<Task[]>(
    "INSERT INTO task (title,completed,user_id) VALUES (?,?,?)",
    [title,0,userID]
  );
  const [rows] : any = await db.query<Task[]>(
    "SELECT * FROM task WHERE id = ?",
    [result.insertId]
  );
  return rows[0];
}

/*update task complete or not*/
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

//task history (get completed task for history)
export async function getTaskHistoryFromDB() : Promise<Task[]>{
  const [rows] = await db.query(
    "SELECT * FROM task WHERE completed = true ORDER BY created_at DESC"
  );
  return rows as Task[];
}

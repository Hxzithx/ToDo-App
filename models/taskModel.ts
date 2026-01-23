import { RowDataPacket } from "mysql2";


export interface Task extends RowDataPacket {
    id: number;
  title: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}
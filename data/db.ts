import mysql from "mysql2/promise";
import dotenv, { config } from "dotenv";

dotenv.config();

export const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD ||"",
  database: process.env.DB_NAME || "todo",
  port: Number(process.env.DB_PORT) || 3306,
  connectionLimit: 10,
});

//verify database connected or not
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("MySQL connected successfully");
    connection.release();
  } catch (error) {
    console.error("MySQL connection failed:", error);
  }
})();

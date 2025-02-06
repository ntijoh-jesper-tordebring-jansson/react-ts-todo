import pool from "../config/db";
import { User } from "../models/user.model";

export const getUserById = async (userId: number): Promise<User[]> => {
  try {
    const connection = await pool.getConnection();
    const rows = await connection.query("SELECT * FROM users WHERE id = ?", [userId]);
    connection.release();
    return rows.length > 0 ? rows[0] : null;
  } catch (error : any) {
    throw new Error("Error fetching user: " + error.message);
  }
};

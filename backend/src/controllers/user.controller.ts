import { Request, Response } from "express";
import { User } from "../models/user.model";
import { getUserById } from "../services/user.services";

export const getUserController = async (req: Request, res: Response): Promise<void> => {
  const userId = Number(req.params.userId);
  try {
    const user: User[] = await getUserById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

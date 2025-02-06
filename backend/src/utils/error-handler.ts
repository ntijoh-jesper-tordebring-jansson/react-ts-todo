import { Response } from "express";

export const handleError = (res: Response, error: any) => {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
};

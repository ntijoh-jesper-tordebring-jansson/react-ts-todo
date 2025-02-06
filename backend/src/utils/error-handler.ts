import { Request, Response, NextFunction } from "express";

// This is the general error handler middleware
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);

  // Send a generic error message, you can customize it based on the error type
  res.status(500).json({
    message: "An unexpected error occurred. Please try again later.",
    error: err.message,
  });
};

// This could be useful for specific error handling (like validation or authentication errors)
export const handle404 = (req: Request, res: Response): void => {
  res.status(404).json({
    message: "Route not found",
  });
};

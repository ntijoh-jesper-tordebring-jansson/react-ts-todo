import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";
import { errorHandler, handle404 } from "./utils/error-handler";

const app = express();

// ✅ Allow requests from multiple specific origins
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/todos", todoRoutes);

// ❌ Handle 404 errors
app.use(handle404);

// ❌ Centralized error handling (this will catch all other errors)
app.use(errorHandler);

export default app;

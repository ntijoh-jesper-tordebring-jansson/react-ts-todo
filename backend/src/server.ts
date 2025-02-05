import "./config/env";
import app from "./app";
import env from "./config/env";
import pool from "./config/db";

const PORT = Number(env.EXPRESS_PORT) || 3000;

// ✅ Ensure DB Connection Before Starting Server
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connection established");
    connection.release();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
})();

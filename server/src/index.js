import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import foodRoutes from "./routes/food.js";
import orderRoutes from "./routes/order.js";
import cartRoutes from "./routes/cart.js";
import { notFound, errorHandler } from "./middleware/error.js";

dotenv.config();

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// ===== Health check =====
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// ===== Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// ===== Error handlers =====
app.use(notFound);
app.use(errorHandler);

// ===== Server setup =====
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });

    // Gracefully handle port conflicts
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use. Change PORT in .env`);
        process.exit(1);
      } else {
        throw err;
      }
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

// Prevent server auto-start in test environment
if (process.env.NODE_ENV !== "test") {
  startServer();
}

export default app; // for tests

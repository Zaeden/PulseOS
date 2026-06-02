import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import v1Router from "./routes/v1/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", v1Router);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    message: "Server is healthy",
  });
});

app.use(errorMiddleware);

export default app;

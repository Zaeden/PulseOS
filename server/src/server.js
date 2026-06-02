import { config } from "./configs/env.js";
import app from "./app.js";
import client from "./configs/redis.js";
import { prisma } from "./configs/db.js";

const PORT = config.PORT;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database Connected");

    await client.connect();
    console.log("Redis Connected");

    app.listen(config.PORT, () => {
      console.log(`Server running at http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

import redisClient from "redis";
import { config } from "./env.js";

const client = redisClient.createClient({
  url: config.REDIS_URL,
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

export default client;

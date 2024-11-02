import dotenv from "dotenv";

const ENV = process.argv[2].toUpperCase()

dotenv.config({
  path:
    ENV === "PROD"
      ? "./.env.prod"
      : ENV === "QAS"
      ? "./.env.qas"
      : "./.env.dev",
});

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    NODE_ENV: ENV
}
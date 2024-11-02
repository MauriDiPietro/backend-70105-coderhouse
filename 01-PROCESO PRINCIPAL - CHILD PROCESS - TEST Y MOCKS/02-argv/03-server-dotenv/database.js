import { connect } from "mongoose";
// import 'dotenv/config'
const ENV = process.argv[2].toUpperCase();

// console.log(ENV);


import dotenv from "dotenv";
dotenv.config({
  path:
    ENV === "PROD"
      ? "./.env.prod"
      : ENV === "QAS"
      ? "./.env.qas"
      : "./.env.dev",
});

export const initMongoDB = async () => {
  try {
    connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};

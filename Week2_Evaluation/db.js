import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.MONGO_URL);
const connection = mongoose.connect(process.env.MONGO_URL);

export default connection;
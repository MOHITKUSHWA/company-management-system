import mongoose from "mongoose";
import { log } from "node:console";

const mongoDbConnect = async () => {
  try {
    let res = await mongoose.connect(process.env.DATABASE as string);
    log(`DataBase Connected to ${res.connection.host}`);
  } catch (error) {
    log(error);
  }
};

export default mongoDbConnect;

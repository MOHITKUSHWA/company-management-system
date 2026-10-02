import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { log } from "node:console";
import mongoDbConnect from "./config/dataBase.ts";
import allRoutes from "./routes/All.route.ts";
import resposnseMiddleware from "./middleware/response.midleware.ts";
import errorMiddleware from "./middleware/errormidleware.ts";

const app = express();
config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", allRoutes);

app.use((req, res: any, next) => {
  res.status(404).json({
    success: false,
    message: "Page Not Found",
  });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  log(`server is start on Port Number ${process.env.PORT}`);
  mongoDbConnect();
});

import express from "express";
import jwtMiddleware from "../middleware/jwt.middleware.ts";
import { getProjects } from "../controller/project.controller.ts";


const router = express.Router();

router.get("/project", jwtMiddleware,getProjects );

export default router;
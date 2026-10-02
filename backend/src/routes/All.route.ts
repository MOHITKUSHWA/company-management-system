import express from "express";
import companyAuthRoute from "./Auth.route.ts";
import employRoute from "./Employ.route.ts";
import projectRoutes from "./project.routes.ts";
import roleRoute from "./role.route.ts";

const router = express.Router();

const allRoutes = [companyAuthRoute, employRoute, projectRoutes, roleRoute];

router.use("/api/v1", allRoutes);

export default router;

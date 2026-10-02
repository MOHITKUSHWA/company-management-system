import express from "express";
import jwtMiddleware from "../middleware/jwt.middleware.ts";
import {
  createRole,
  deleteRole,
  getRoles,
  updateRole,
} from "../controller/roles.controller.ts";

const routes = express.Router();

routes.route("/roles").get(jwtMiddleware, getRoles);

routes.route("/roles/create").post(jwtMiddleware, createRole);

routes
  .route("/roles/:id")
  .put(jwtMiddleware, updateRole)
  .delete(jwtMiddleware, deleteRole);

export default routes;

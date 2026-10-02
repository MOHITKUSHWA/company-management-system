import express from "express";
import jwtMiddleware from "../middleware/jwt.middleware.ts";
import {
  createEmploy,
  deleteEmploy,
  editEmploy,
  getEmployDetails,
} from "../controller/Employ.controller.ts";

const router = express.Router();

router
  .route("/employees")
  .get(jwtMiddleware, getEmployDetails)
  .post(jwtMiddleware, createEmploy);

router
  .route("/employees/:id")
  .put(jwtMiddleware, editEmploy)
  .delete(jwtMiddleware, deleteEmploy);

export default router;

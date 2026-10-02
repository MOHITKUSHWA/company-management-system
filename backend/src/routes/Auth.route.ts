import express from "express";
import {
  forgetPassword,
  getDetails,
  login,
  otpVerification,
  register,
  resendOtp,
  resetPassword,
  updateProfile,
  changePassword,
  deleteAccount,
  uploadProfileImage,
} from "../controller/Auth.controller.ts";
import { registerValidation } from "../middleware/auth.validation.ts";
import jwtMiddleware from "../middleware/jwt.middleware.ts";
import upload from "../config/cloudinary.config.ts";

const routes = express.Router();

routes.post("/auth/register", registerValidation, register);
routes.post("/auth/login", login);

routes.post("/auth/forgetPassword", forgetPassword);
routes.post("/auth/resetPassword", resetPassword);

routes.get("/auth/detail", jwtMiddleware, getDetails);
routes.post("/auth/updateProfile", jwtMiddleware, updateProfile);
routes.post('/auth/profileUpload' , jwtMiddleware , upload.single('profileImage') , uploadProfileImage )

routes.post("/auth/verifyOtp", otpVerification);
routes.post("/auth/resendOtp", resendOtp);


routes.post("/auth/changePassword", jwtMiddleware, changePassword);
routes.delete("/auth/deleteAccount", jwtMiddleware, deleteAccount);

export default routes;

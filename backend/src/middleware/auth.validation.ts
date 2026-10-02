import { body } from "express-validator";

export const registerValidation = [
  body("companyName").notEmpty().withMessage("Company name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];
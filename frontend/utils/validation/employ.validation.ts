import * as yup from "yup";

export const createEmploySchema = yup.object({
  firstName: yup
    .string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .lowercase()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
      "Enter a valid email address",
    ),
  title: yup.string().required("Title is required"),
});

export const createRoleSchema = yup.object({
  role: yup
    .string()
    .required("Role is required")
    .min(2, "Role must be at least 2 characters")
    .max(20, "Role must be at most 20 characters"),
  premistion: yup.string().required("Premistion is required"),
});

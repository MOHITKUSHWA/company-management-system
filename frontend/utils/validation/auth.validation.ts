import * as yup from "yup";

export const registerSchema = yup.object({
  companyName: yup
    .string()
    .required("Company Name is required")
    .min(2, "Company Name must be at least 2 characters"),
  nameOfowner: yup
    .string()
    .required("Name of Owner is required")
    .min(2, "Name of Owner must be at least 2 characters"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .lowercase()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
      "Enter a valid email address",
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must contain at least one special character",
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords don't match")
    .required("Confirm Password is required"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .lowercase()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
      "Enter a valid email address",
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must contain at least one special character",
    ),
});

export const emailSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .lowercase()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
      "Enter a valid email address",
    ),
});

export const resetSchema = yup.object({
  newPassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must contain at least one special character",
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords don't match")
    .required("Confirm Password is required"),
});

export const updateProfileSchema = yup.object({
  companyName: yup
    .string()
    .required("Company Name is required")
    .min(2, "Company Name must be at least 2 characters"),
  nameOfOwner: yup
    .string()
    .required("Name of Owner is required")
    .min(2, "Name of Owner must be at least 2 characters"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .lowercase()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
      "Enter a valid email address",
    ),
});

export const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .required("Current Password is required")
    .min(8, "Current Password must be at least 8 characters")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must contain at least one special character",
    ),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(8, "New Password must be at least 8 characters")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must contain at least one special character",
    ),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords don't match")
    .required("Confirm New Password is required"),
});

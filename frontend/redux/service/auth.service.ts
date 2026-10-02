import { privateAxios, publicAxios } from "@/utils/axios";
import authRoutes from "../routes/auth.routes";

const signUp = async (data: Object) => {
  const res = await publicAxios.post(authRoutes.register, data);
  return res.data;
};

const signIn = async (data: Object) => {
  const res = await publicAxios.post(authRoutes.login, data);
  return res.data;
};

const getDetails = async () => {
  const res = await privateAxios.get(authRoutes.details);
  return res.data;
};

const forgetPassword = async (data: Object) => {
  const res = await publicAxios.post(authRoutes.forgetPassword, data);
  return res?.data;
};

const otpVerify = async (data: Object) => {
  const res = await publicAxios.post(authRoutes.otpVerify, data);
  return res?.data;
};

const resendOtp = async (data: Object) => {
  const res = await publicAxios.post(authRoutes.resendOtp, data);
  return res?.data;
};

const resetPassword = async (data: Object) => {
  const res = await publicAxios.post(authRoutes.resetPassword, data);
  return res?.data;
};

const updateProfile = async (data: Object) => {
  const res = await privateAxios.post(authRoutes.updateProfile, data);
  return res?.data;
};

const changePassword = async (data: Object) => {
  const res = await privateAxios.post(authRoutes.changePassword, data);
  return res?.data;
};

const deleteAccount = async () => {
  const res = await privateAxios.delete(authRoutes.deleteAccount);
  return res?.data;
};

const profileImageUpload = async (data: Object) => {
  try {
    const res = await privateAxios.post(authRoutes.profileImageUpload, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

const authService = {
  signIn,
  signUp,
  getDetails,
  forgetPassword,
  otpVerify,
  resendOtp,
  resetPassword,
  updateProfile,
  changePassword,
  deleteAccount,
  profileImageUpload,
};
export default authService;

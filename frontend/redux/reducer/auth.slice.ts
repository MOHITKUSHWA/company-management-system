import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth.service";

export const signUpCompany = createAsyncThunk(
  "auth/signUpCompany",
  async (data: Object, thunkAPI) => {
    try {
      const res = await authService.signUp(data);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        ...error.response.data,
      });
    }
  },
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data: Object, thunkAPI) => {
    try {
      const res = await authService.signIn(data);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        ...error.response.data,
      });
    }
  },
);

export const getDetails = createAsyncThunk(
  "auth/getDetails",
  async (data: Object, thunkAPI) => {
    try {
      const res = await authService.getDetails();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        ...error.response.data,
      });
    }
  },
);

export const forGetPassword = createAsyncThunk(
  "auth/forGetPassword",
  async (data: Object, thunkAPI) => {
    try {
      const res = await authService.forgetPassword(data);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        ...error.response.data,
      });
    }
  },
);

export const otpVarifyslice = createAsyncThunk(
  "auth/otpVerify",
  async (data: Object, thunkAPI) => {
    try {
      const res = await authService.otpVerify(data);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        ...error.response.data,
      });
    }
  },
);

export const resendOtpSlice = createAsyncThunk(
  "auth/resendOtp",
  async (data: Object, thunkAPI) => {
    try {
      const res = await authService.resendOtp(data);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        ...error.response.data,
      });
    }
  },
);

export const resetPasswordSlice = createAsyncThunk(
  "auth/resetPassword",
  async (data: Object, thunkAPI) => {
    try {
      const res = await authService.resetPassword(data);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        ...error.response.data,
      });
    }
  },
);

export const updateProfileSlice = createAsyncThunk(
  "auth/updateProfile",
  async (data: Object, thunkAPI) => {
    try {
      const res = await authService.updateProfile(data);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        ...error.response.data,
      });
    }
  },
);

export const changePasswordSlice = createAsyncThunk(
  "auth/changePassword",
  async (data: Object, thunkAPI) => {
    try {
      const res = await authService.changePassword(data);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        ...error.response.data,
      });
    }
  },
);

export const deleteAccountSlice = createAsyncThunk(
  "auth/deleteAccount",
  async (data: Object, thunkAPI) => {
    try {
      const res = await authService.deleteAccount();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        ...error.response.data,
      });
    }
  },
);

export const profileUploadSlice = createAsyncThunk(
  "auth/profileUpload",
  async (data: Object, thunkAPI) => {
    try {
      const res = await authService.profileImageUpload(data);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        ...error.response.data,
      });
    }
  },
);

const initialState = {
  user: null,
  loading: false,
  createUser: {
    loading: false,
    success: false,
    data: {},
    error: false,
  },
  login: {
    loading: false,
    success: false,
    data: {},
    error: false,
  },
  otp: {
    loading: false,
    success: false,
    data: {},
    error: false,
  },
  resendOtp: {
    loading: false,
    success: false,
    data: {},
    error: false,
  },
  forgetPassword: {
    loading: false,
    success: false,
    data: {},
    error: false,
  },
  resetPassword: {
    loading: false,
    success: false,
    data: {},
    error: false,
  },
  updateProfile: {
    loading: false,
    success: false,
    data: {},
    error: false,
  },
  changePassword: {
    loading: false,
    success: false,
    data: {},
    error: false,
  },
  deleteAccount: {
    loading: false,
    success: false,
    data: {},
    error: false,
  },
  profileUpload: {
    loading: false,
    success: false,
    data: {},
    error: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoginData: (state) => {
      state.login.data = {};
      state.login.success = false;
      state.login.error = false;
      state.login.loading = false;
    },
    setSignUpData: (state) => {
      state.createUser.data = {};
      state.createUser.success = false;
      state.createUser.error = false;
      state.createUser.loading = false;
    },
    setForgetPasswordData: (state) => {
      state.forgetPassword.data = {};
      state.forgetPassword.success = false;
      state.forgetPassword.error = false;
      state.forgetPassword.loading = false;
    },
    setResetPasswordData: (state) => {
      state.resetPassword.data = {};
      state.resetPassword.success = false;
      state.resetPassword.error = false;
      state.resetPassword.loading = false;
    },
    setOtpData: (state) => {
      state.otp.data = {};
      state.otp.success = false;
      state.otp.error = false;
      state.otp.loading = false;
    },
    setResendOtpData: (state) => {
      state.resendOtp.data = {};
      state.resendOtp.success = false;
      state.resendOtp.error = false;
      state.resendOtp.loading = false;
    },

    setLogOut: (state) => {
      state = initialState;
    },
    setprofileUpdateData: (state) => {
      state.updateProfile.data = {};
      state.updateProfile.success = false;
      state.updateProfile.error = false;
      state.updateProfile.loading = false;
    },
    setChangePasswordData: (state) => {
      state.changePassword.data = {};
      state.changePassword.success = false;
      state.changePassword.error = false;
      state.changePassword.loading = false;
    },
    setDeleteAccountData: (state) => {
      state.deleteAccount.data = {};
      state.deleteAccount.success = false;
      state.deleteAccount.error = false;
      state.deleteAccount.loading = false;
    },
    setprofileUploadData: (state) => {
      state.profileUpload.data = {};
      state.profileUpload.success = false;
      state.profileUpload.error = false;
      state.profileUpload.loading = false;
    },
  },
  extraReducers: (builder) => {
    /**
     * Create a New Company ....
     */

    builder.addCase(signUpCompany.pending, (state) => {
      state.createUser.loading = true;
      state.createUser.success = false;
      state.createUser.error = false;
      state.createUser.data = {};
    });
    builder.addCase(signUpCompany.fulfilled, (state, action) => {
      state.createUser.loading = false;
      state.createUser.success = true;
      state.createUser.error = false;
      state.createUser.data = action.payload;
    });
    builder.addCase(signUpCompany.rejected, (state, action: any) => {
      state.createUser.loading = false;
      state.createUser.success = false;
      state.createUser.error = true;
      state.createUser.data = action.payload;
    });

    /**
     * Login a Company and Employee
     */

    builder.addCase(signIn.pending, (state) => {
      state.login.loading = true;
      state.login.success = false;
      state.login.error = false;
      state.login.data = {};
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.login.loading = false;
      state.login.success = true;
      state.login.error = false;
      state.login.data = action.payload;
    });
    builder.addCase(signIn.rejected, (state, action: any) => {
      state.login.loading = false;
      state.login.success = false;
      state.login.error = true;
      state.login.data = action.payload;
    });

    /**
     * get a Login user details
     */

    builder.addCase(getDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
    });
    builder.addCase(getDetails.rejected, (state) => {
      state.loading = false;
    });

    /**
     * verify otp for registration
     */
    builder.addCase(otpVarifyslice.pending, (state) => {
      state.otp.loading = true;
      state.otp.success = false;
      state.otp.error = false;
      state.otp.data = {};
    });
    builder.addCase(otpVarifyslice.fulfilled, (state, action) => {
      state.otp.loading = false;
      state.otp.success = true;
      state.otp.error = false;
      state.otp.data = action.payload;
    });
    builder.addCase(otpVarifyslice.rejected, (state, action: any) => {
      state.otp.loading = false;
      state.otp.success = false;
      state.otp.error = true;
      state.otp.data = action.payload;
    });

    /**
     * resend otp for registration
     */

    builder.addCase(resendOtpSlice.pending, (state) => {
      state.resendOtp.loading = true;
      state.resendOtp.success = false;
      state.resendOtp.error = false;
      state.resendOtp.data = {};
    });
    builder.addCase(resendOtpSlice.fulfilled, (state, action) => {
      state.resendOtp.loading = false;
      state.resendOtp.success = true;
      state.resendOtp.error = false;
      state.resendOtp.data = action.payload;
    });
    builder.addCase(resendOtpSlice.rejected, (state, action: any) => {
      state.resendOtp.loading = false;
      state.resendOtp.success = false;
      state.resendOtp.error = true;
      state.resendOtp.data = action.payload;
    });

    /**
     * forget password
     */
    builder.addCase(forGetPassword.pending, (state) => {
      state.forgetPassword.loading = true;
      state.forgetPassword.success = false;
      state.forgetPassword.error = false;
      state.forgetPassword.data = {};
    });
    builder.addCase(forGetPassword.fulfilled, (state, action) => {
      state.forgetPassword.loading = false;
      state.forgetPassword.success = true;
      state.forgetPassword.error = false;
      state.forgetPassword.data = action.payload?.data;
    });
    builder.addCase(forGetPassword.rejected, (state, action: any) => {
      state.forgetPassword.loading = false;
      state.forgetPassword.success = false;
      state.forgetPassword.error = true;
      state.forgetPassword.data = action.payload;
    });

    /**
     * reset password
     */

    builder.addCase(resetPasswordSlice.pending, (state) => {
      state.resetPassword.loading = true;
      state.resetPassword.success = false;
      state.resetPassword.error = false;
      state.resetPassword.data = {};
    });
    builder.addCase(resetPasswordSlice.fulfilled, (state, action) => {
      state.resetPassword.loading = false;
      state.resetPassword.success = true;
      state.resetPassword.error = false;
      state.resetPassword.data = action.payload?.data;
    });
    builder.addCase(resetPasswordSlice.rejected, (state, action: any) => {
      state.resetPassword.loading = false;
      state.resetPassword.success = false;
      state.resetPassword.error = true;
      state.resetPassword.data = action.payload;
    });

    /**
     * update profile
     */

    builder.addCase(updateProfileSlice.pending, (state) => {
      state.updateProfile.loading = true;
      state.updateProfile.success = false;
      state.updateProfile.error = false;
      state.updateProfile.data = {};
    });
    builder.addCase(updateProfileSlice.fulfilled, (state, action) => {
      state.updateProfile.loading = false;
      state.updateProfile.success = true;
      state.updateProfile.error = false;
      state.updateProfile.data = action.payload?.data;
      state.user = action.payload?.data;
    });
    builder.addCase(updateProfileSlice.rejected, (state, action: any) => {
      state.updateProfile.loading = false;
      state.updateProfile.success = false;
      state.updateProfile.error = true;
      state.updateProfile.data = action.payload;
    });

    /**
     * change password
     */
    builder.addCase(changePasswordSlice.pending, (state) => {
      state.changePassword.loading = true;
      state.changePassword.success = false;
      state.changePassword.error = false;
      state.changePassword.data = {};
    });
    builder.addCase(changePasswordSlice.fulfilled, (state, action) => {
      state.changePassword.loading = false;
      state.changePassword.success = true;
      state.changePassword.error = false;
      state.changePassword.data = action.payload?.data;
    });
    builder.addCase(changePasswordSlice.rejected, (state, action: any) => {
      state.changePassword.loading = false;
      state.changePassword.success = false;
      state.changePassword.error = true;
      state.changePassword.data = action.payload;
    });

    /**
     * delete account
     */
    builder.addCase(deleteAccountSlice.pending, (state) => {
      state.deleteAccount.loading = true;
      state.deleteAccount.success = false;
      state.deleteAccount.error = false;
      state.deleteAccount.data = {};
    });
    builder.addCase(deleteAccountSlice.fulfilled, (state, action) => {
      state.deleteAccount.loading = false;
      state.deleteAccount.success = true;
      state.deleteAccount.error = false;
      state.deleteAccount.data = action.payload?.data;
    });
    builder.addCase(deleteAccountSlice.rejected, (state, action: any) => {
      state.deleteAccount.loading = false;
      state.deleteAccount.success = false;
      state.deleteAccount.error = true;
      state.deleteAccount.data = action.payload;
    });

    /**
     * profile upload
     *
     */

    builder.addCase(profileUploadSlice.pending, (state) => {
      state.profileUpload.loading = true;
      state.profileUpload.success = false;
      state.profileUpload.error = false;
      state.profileUpload.data = {};
    });
    builder.addCase(profileUploadSlice.fulfilled, (state, action) => {
      state.profileUpload.loading = false;
      state.profileUpload.success = true;
      state.profileUpload.error = false;
      state.profileUpload.data = action.payload?.data;
    });
    builder.addCase(profileUploadSlice.rejected, (state, action: any) => {
      state.profileUpload.loading = false;
      state.profileUpload.success = false;
      state.profileUpload.error = true;
      state.profileUpload.data = action.payload;
    });
  },
});

export const {
  setLogOut,
  setSignUpData,
  setLoginData,
  setOtpData,
  setResendOtpData,
  setForgetPasswordData,
  setResetPasswordData,
  setprofileUpdateData,
  setChangePasswordData,
  setDeleteAccountData,
  setprofileUploadData,
} = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import rolesService from "../service/roles.service";

export const getRoleListSlice = createAsyncThunk(
  "roles/getRoleList",
  async (_, thunkAPI) => {
    try {
      const res = await rolesService.getAllRoles();

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        ...error.response.data,
      });
    }
  },
);

export const createRoleSlice = createAsyncThunk(
  "roles/createRole",
  async (data: Object, thunkAPI) => {
    try {
      const res = await rolesService.createRole(data);

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
  loading: false,
  success: false,
  data: [],
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoleListSlice.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(getRoleListSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.data = action.payload.data;
    });
    builder.addCase(getRoleListSlice.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
  },
});

export default authSlice.reducer;

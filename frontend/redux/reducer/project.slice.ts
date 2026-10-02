import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectService from "../service/project.service";

export const getProjectListSlice = createAsyncThunk(
  "project/getProjectList",
  async (_, thunkAPI) => {
    try {
      const res = await projectService.getProjectList();

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

export const projectListSlice = createSlice({
  name: "projectList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectListSlice.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(getProjectListSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.data = action.payload.data;
    });
    builder.addCase(getProjectListSlice.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
  },
});

export default projectListSlice.reducer;
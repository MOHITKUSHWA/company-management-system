import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employService from "../service/employ.service";

export const getEmployDetailSlice = createAsyncThunk(
  "auth/getEmployDetail",
  async (id: string, thunkAPI) => {
    try {
      const res = await employService.getEmployDetails(id);

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        ...error.response.data,
      });
    }
  },
);

export const createEmploySlice = createAsyncThunk(
  "auth/createEmploy",
  async (data: Object, thunkAPI) => {
    try {
      const res = await employService.createEmploy(data);

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        ...error.response.data,
      });
    }
  },
);

export const editEmploySlice = createAsyncThunk(
  "auth/editEmploy",
  async ({ id, data }: { id: string; data: Object }, thunkAPI) => {
    try {
      const res = await employService.editEmploy(id, data);

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        ...error.response.data,
      });
    }
  },
);

export const deleteEmploySlice = createAsyncThunk(
  "auth/deleteEmploy",
  async (id: string, thunkAPI) => {
    try {
      const res = await employService.deleteEmploy(id);

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
  create: {
    loading: false,
    success: false,
    data: {},
    error: false,
  },
  edit: {
    loading: false,
    success: false,
    data: {},
    error: false,
  },
  delete: {
    loading: false,
    success: false,
    data: {},
    error: false,
  },
};

export const employDetailSlice = createSlice({
  name: "employDetail",
  initialState: initialState,
  reducers: {
    setCreateEmployData: (state) => {
      state.create.data = {};
      state.create.success = false;
      state.create.error = false;
      state.create.loading = false;
    },
    setEditEmployData: (state) => {
      state.edit.data = {};
      state.edit.success = false;
      state.edit.error = false;
      state.edit.loading = false;
    },
    setDeleteEmployData: (state) => {
      state.delete.data = {};
      state.delete.success = false;
      state.delete.error = false;
      state.delete.loading = false;
    },
  },
  extraReducers: (builder) => {
    /**
     * get a Employee Details
     */

    builder.addCase(getEmployDetailSlice.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
      state.data = [];
    });
    builder.addCase(getEmployDetailSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.data = action.payload?.data;
    });
    builder.addCase(getEmployDetailSlice.rejected, (state, action: any) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.data = action.payload;
    });

    /**
     * Create a Employee
     */
    builder.addCase(createEmploySlice.pending, (state) => {
      state.create.loading = true;
      state.create.success = false;
      state.create.error = false;
      state.create.data = {};
    });
    builder.addCase(createEmploySlice.fulfilled, (state, action) => {
      state.create.loading = false;
      state.create.success = true;
      state.create.error = false;
      state.create.data = action.payload;
    });
    builder.addCase(createEmploySlice.rejected, (state, action: any) => {
      state.create.loading = false;
      state.create.success = false;
      state.create.error = true;
      state.create.data = action.payload;
    });

    /**
     * Edit a Employee
     */
    builder.addCase(editEmploySlice.pending, (state) => {
      state.edit.loading = true;
      state.edit.success = false;
      state.edit.error = false;
      state.edit.data = {};
    });
    builder.addCase(editEmploySlice.fulfilled, (state, action) => {
      state.edit.loading = false;
      state.edit.success = true;
      state.edit.error = false;
      state.edit.data = action.payload;
    });
    builder.addCase(editEmploySlice.rejected, (state, action: any) => {
      state.edit.loading = false;
      state.edit.success = false;
      state.edit.error = true;
      state.edit.data = action.payload;
    });

    /**
     * Delete a Employee
     */
    builder.addCase(deleteEmploySlice.pending, (state) => {
      state.delete.loading = true;
      state.delete.success = false;
      state.delete.error = false;
      state.delete.data = {};
    });
    builder.addCase(deleteEmploySlice.fulfilled, (state, action) => {
      state.delete.loading = false;
      state.delete.success = true;
      state.delete.error = false;
      state.delete.data = action.payload;
    });
    builder.addCase(deleteEmploySlice.rejected, (state, action: any) => {
      state.delete.loading = false;
      state.delete.success = false;
      state.delete.error = true;
      state.delete.data = action.payload;
    });
  },
});

export const { setCreateEmployData, setEditEmployData, setDeleteEmployData } =
  employDetailSlice.actions;

export default employDetailSlice.reducer;

//

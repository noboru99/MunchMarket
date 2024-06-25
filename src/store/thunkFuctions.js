import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
  "/join",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/join`, body);
      console.log("responseData", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/login",
  async (body, thunkAPI) => {
    const formData = new FormData();
    formData.append("loginId", body.loginID);
    formData.append("password", body.loginPassword);
    try {
      const response = await axiosInstance.post(`/login`, formData, {
        // 쿼리 파라미터로 loginId 전달
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: "application/json",
        },
      });
      console.log("response", response);
      // console.log("Response Headers:", response.headers);
      const authToken = response.headers.getAuthorization();
      // console.log("authToken",authToken);
      return { ...response.data, accessToken: authToken };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const authUser = createAsyncThunk("user/userAuth", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get(
      `/login`
    );
    console.log("responseData", response.data);

    return response.data
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data || error.message);
  }
});

export const logoutUer = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`logout`);
    console.log("responseData", response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data || error.message);
  }
});

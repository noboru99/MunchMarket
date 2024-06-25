import { createSlice } from "@reduxjs/toolkit"
import { loginUser, logoutUer, registerUser } from "./thunkFuctions";


const initialState = {
  userData: {
    loginId: "",
    password: "",
    confirmPassword: "",
    name: "",
    ruby: "",
    email: "",
    phoneNumber: "",
    sex: "",
    birth: "",
    postalCode: "",
    regionAddress: "",
    detailAddress: "",
    smsVerified: false, // SMS인증번호 완료 여부
  },
  accessToken: null,
  isAuth: false,
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("회원가입에러", action.payload);
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
        state.accessToken = action.payload.accessToken;
        // console.log("state.accessToken", state.accessToken);
        // console.log("action.payload",action.payload)
        //로그인성공~
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.payload);
      })

      .addCase(logoutUer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUer.fulfilled, (state) => {
        state.isLoading = false;
        state.userData = initialState.userData;
        state.isAuth = false;
        state.accessToken = "";
        
      })
      .addCase(logoutUer.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.payload);
      });
  },
});

export default userSlice.reducer
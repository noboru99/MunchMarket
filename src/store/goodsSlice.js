import { createSlice } from "@reduxjs/toolkit";
import { productRegister } from "./thunkFuctions";

const initialState = {
  goodsData: {
    categoryId: 0,
    productName: "",
    basePrice: "",
    shortDescription: "",
    stock: 0, // 입력안할시 default 50 개
    deliveryDescription: "",
    packagingTypeId: 0, // 포장 타입
    origin: "",
    unit: "",
    volume: "",
    expirationDescription: "",
    allergyDescription: "",
    guideDescription: "",
    mainImage: "", // input type="file"
    subImage: "", // input type="file"
    productDesTop1: "",
    productDesTop2: "", // 상품이름이랑 같게
    productDesTopMain: "",
    isOnSale: false,
    salePercentage: 0,
    isPurchaseStatus: true,
  },
  isLoading: false,
  error: "",
};

const goodsSlice = createSlice({
    name: "goods",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(productRegister.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(productRegister.fulfilled, (state, action) => {
                state.isLoading = false;
                state.goodsData = action.payload;
                console.log("state", state.goodsData);
                console.log("action.payload", action.payload);
            })
            .addCase(productRegister.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                console.log("productRegisterError", action.payload);
            })
    }
});

export default goodsSlice.reducer;
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk("fetchAllProducts", async (keyword="", thunkAPI) => {
    try {
        console.log(keyword);
        const response = await axios.get(`/api/v1/products?keyword=${keyword}`);
        return response.data;
    } catch (err) {

        return thunkAPI.rejectWithValue(err.response.data.message);
    }
})

export const allProductSlice = createSlice({
    name: "allProducts",
    initialState: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchAllProducts.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.products = action.payload.products;
            state.numOfProducts = action.payload.productCount;
        });
        builder.addCase(fetchAllProducts.pending, (state, action)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchAllProducts.rejected, (state, action)=>{
            state.isLoading = false;
            console.log("Error", action.payload);
            state.error = action.payload;
        })
    }

})

export const fetchProductsDetails = createAsyncThunk("fetchProductsDetails", async (id, thunkAPI) => {
    try {
        const response = await axios.get(`/api/v1/product/${id}`);
        console.log(response.data);
        return response.data;

    } catch (err) {

        return thunkAPI.rejectWithValue(err.response.data.message);
    }
})

export const productDetailsSlice= createSlice({
    name: "productDetails",
    initialState: {isLoading: true},
    extraReducers: (builder) =>{
        builder.addCase(fetchProductsDetails.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.product = action.payload.product;
            console.log(action.payload.product);
        });
        builder.addCase(fetchProductsDetails.pending, (state, action)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchProductsDetails.rejected, (state, action)=>{
            state.isLoading = false;
            console.log("Error", action.payload);
            state.error = action.payload;
        })
    }

})
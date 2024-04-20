import {configureStore} from "@reduxjs/toolkit";
import {allProductSlice, productDetailsSlice} from "./slice/Products/productSlice";

export const store = configureStore({
    reducer: {
        allProducts: allProductSlice.reducer,
        productDetails: productDetailsSlice.reducer
    }
});

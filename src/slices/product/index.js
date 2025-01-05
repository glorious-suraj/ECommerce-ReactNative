import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiInstance from '../../api/axios';

export const getProductData = createAsyncThunk("product/getAll", async () => {
    try {
        const response = await apiInstance.get(`/customer?id=0&secondaryKey=b13435eb-7643-11ef-a3d0-025a30235915&productName=&categoryName=kitchen%20%26%20dining&subCategoryName=cook%20wear&subSubCategoryName=&brandName=&isFeatured=0&search=&currentPage=1&itemsPerPage=40&sortBy=createdDate&sortOrder=desc&isFetchListing=0&searchTag=&accessKey=7f1016e1-048f-11ef-a3f4-02c89aaa64a3`)
        if (response && response.object) {
            return response.object
        }
    } catch (error) {
        console.log(error)
    }
})

export const getProductDetails = createAsyncThunk("productDetails/get", async (productId) => {
    try {
        const response = await apiInstance.get(`/detail?productId=${productId}&sizeChartPreference=category&categoryName=&accessKey=7f1016e1-048f-11ef-a3f4-02c89aaa64a3`)
        if (response && response.object) {
            return response.object
        }
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    isLoading: false,
    productList: [],
    isError: false,
    productDetails: {},
}

export const productSlice = createSlice({
    initialState: initialState,
    name: 'product',
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductData.pending, (state) => {
                state.isLoading = true
                state.productList = []
            })
            .addCase(getProductData.fulfilled, (state, action) => {
                state.isLoading = false
                state.productList = action.payload
            })
            .addCase(getProductData.rejected, (state) => {
                state.isLoading = false
                state.isError = true
                state.productList = []
            })
            .addCase(getProductDetails.pending, (state) => {
                state.isLoading = true
                state.productDetails = {}
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.productDetails = action.payload
            })
            .addCase(getProductDetails.rejected, (state) => {
                state.isLoading = false
                state.isError = true
                state.productDetails = {}
            })
    }
})

export const { } = productSlice.actions;
export default productSlice.reducer;
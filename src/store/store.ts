import { productApi } from './../api/productApi';
import { configureStore } from '@reduxjs/toolkit';
import modalWindowReducer from './slices/windowSlices/windowSlices';
import productFormReducer from './slices/windowSlices/productFormSlice';

const store = configureStore({
  reducer: {
    test: modalWindowReducer,
    productForm: productFormReducer,
    [productApi.reducerPath]: productApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware), 
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

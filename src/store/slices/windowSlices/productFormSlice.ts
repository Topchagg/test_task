import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface productFormSlice {
    isUpdate:boolean,
    idOfElement:number|null
  }

const initialState: productFormSlice = {
    isUpdate:false,
    idOfElement: null,
};

const productForm = createSlice({
  name: 'productForm',
  initialState,
  reducers: {
    setIsUpdate(state,payload:PayloadAction<boolean>) {
      state.isUpdate = payload.payload
    },
    setIdOfProduct(state,payload:PayloadAction<number|null>){
        state.idOfElement = payload.payload
    },
  },
});

export const { setIsUpdate, setIdOfProduct} = productForm.actions;

export default productForm.reducer;
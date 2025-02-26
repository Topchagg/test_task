import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface windowSlice {
    isModalWindowOpen: boolean;
    modalWindowTitle: string;
    modalWindowForm: string | null;
    isProductDelete: string | null;
    onSubmitText: string | null;
  }

const initialState: windowSlice = {
  isModalWindowOpen: false,
  modalWindowTitle:'',
  modalWindowForm: null,
  isProductDelete: null,
  onSubmitText: null,
};

const windowSlice = createSlice({
  name: 'windowSlice',
  initialState,
  reducers: {
    setModalWindowStatus(state) {
      state.isModalWindowOpen = !state.isModalWindowOpen;
    },
    setModalWindowTitle(state,action: PayloadAction<string>){
        state.modalWindowTitle = action.payload
    },
    setModalWindowForm(state,action:PayloadAction<string|null>){
      state.modalWindowForm = action.payload
    },
    setOnSubmitText(state,action:PayloadAction<string|null>){
      state.onSubmitText = action.payload
    }
  },
});

export const { setModalWindowStatus,setModalWindowTitle,setModalWindowForm,setOnSubmitText } = windowSlice.actions;

export default windowSlice.reducer;
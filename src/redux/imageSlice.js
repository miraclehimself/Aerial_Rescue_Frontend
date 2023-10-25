import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  selectedImage: null,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    clearImage: (state) => {
      state.selectedImage = null;
    },
  },
});

export const { setImage, clearImage } = imageSlice.actions;
export default imageSlice.reducer;

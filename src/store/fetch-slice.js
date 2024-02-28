import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  uid: null,
  cartAmount: 0,
  data: [],
};
const fetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {
    getUserUid: (state, action) => {
      state.uid = action.payload.uid;
    },
    addAmount: (state, action) => {
      state.cartAmount += action.payload.number;
    },
    setData: (state, action) => {
      state.data = action.payload.data;
    },
  },
});
export const fetchSlideAction = fetchSlice.actions;
export default fetchSlice;

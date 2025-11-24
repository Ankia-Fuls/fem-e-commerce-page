import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: 0,
    reducers: {
        add(state, action) {
            return state + action.payload;
        },
        remove(state, action) {
            return 0;
        }
    }
})

export const { add, remove } = cartSlice.actions;         //returns the functions
export default cartSlice.reducer                //returns the state
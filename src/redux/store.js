import { configureStore } from '@reduxjs/toolkit'
import calc from "./slice/calcSlice";

export default configureStore({
    reducer: {
        calc,
    }
})
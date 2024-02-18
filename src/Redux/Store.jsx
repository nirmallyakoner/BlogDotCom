import { configureStore } from "@reduxjs/toolkit";
import { Authslice } from "./Authslice";

export const store = configureStore({
    reducer: {
        Auth: Authslice.reducer
    }
})
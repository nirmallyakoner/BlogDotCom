import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const Authslice = createSlice({
  name: "auth",
  initialState: {
    toggle: false,
  },
  reducers: {
    Remove_Token: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("mobile");
      state.toggle = false;
      toast("Logged Out Successfully")
    },
    Check_Token: (state, action) => {
      if (localStorage.getItem("token")) {
        state.toggle = true;
      }
    },
  },
});
export const { Remove_Token, Check_Token } = Authslice.actions;

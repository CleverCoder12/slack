import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "../features/Channel/channelSlice";
import userReducer from "../features/User/userSlice";

export const store = configureStore({
  reducer: {
    channel: channelReducer,
    user: userReducer,
  },
});

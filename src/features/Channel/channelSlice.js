import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  id: null,
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannel: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
  },
});

export const { setChannel } = channelSlice.actions;

export const selectChannelName = (state) => state.channel.name;
export const selectChannelId = (state) => state.channel.id;

export default channelSlice.reducer;

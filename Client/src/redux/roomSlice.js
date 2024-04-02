import { createSlice } from '@reduxjs/toolkit';
const roomSlice = createSlice({
    name: 'room',
    initialState: {
        roomName: null,
    },
    reducers: {
        embeddedRoomName: (state, action) => {
            state.roomName = action.payload;
        },
    },
});

export const { embeddedRoomName } = roomSlice.actions;

export default roomSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	heang: 0,
	sang: 0,
};

export const curSlice = createSlice({
	name: 'cur',
	initialState,
	reducers: {
		setheang(state, action) {
			state.lng = action.payload;
		},
		setsang(state, action) {
			state.lat = action.payload;
		},
	},
});

export const { setheang, setsang } = curSlice.actions;
export default curSlice;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	heang: [],
	sang: [],
};

export const ufavSlice = createSlice({
	name: 'ufav',
	initialState,
	reducers: {
		setheang(state, action) {
			state.heang = [...action.payload];
		},
		setsang(state, action) {
			state.sang = [...action.payload];
		},
	},
});

export const { setheang, setsang } = ufavSlice.actions;
export default ufavSlice;

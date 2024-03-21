import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	heang: [],
	sang: [],
	which: 0,
	changed: false,
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
		setwhich(state, action) {
			state.which = action.payload;
		},
		setchanged(state, action) {
			state.changed = action.payload;
		},
	},
});

export const { setheang, setsang, setwhich, setchanged } = ufavSlice.actions;
export default ufavSlice;

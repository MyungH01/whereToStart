import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	curheang: { code: 0, name: '' },
	cursang: { code: 0, name: '' },
};

export const curSlice = createSlice({
	name: 'cur',
	initialState,
	reducers: {
		setcurheang(state, action) {
			state.curheang = { code: action.code, name: action.name };
		},
		setcursang(state, action) {
			state.cursang = { code: action.code, name: action.name };
		},
	},
});

export const { setcurheang, setcursang } = curSlice.actions;
export default curSlice;

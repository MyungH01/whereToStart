import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	curheang: { code: 0, name: '', SUM_CM_SA: 0, SUM_TOTAL_NS: 0, RATIO_CM_SA_NS: 0, MAX_TOTAL_NS_ST_NM: '', MAX_CM_SA_ST_NM: '' },
	cursang: { code: 0, name: '', SUM_CM_SA: 0, SUM_TOTAL_NS: 0, RATIO_CM_SA_NS: 0, MAX_TOTAL_NS_ST_NM: '', MAX_CM_SA_ST_NM: '' },
};

export const curSlice = createSlice({
	name: 'cur',
	initialState,
	reducers: {
		setcurheang(state, action) {
			state.curheang = {
				code: action.code,
				name: action.name,
				sum_cm_sa: action.sum_cm_sa,
				sum_total_ns: action.sum_total_ns,
				ratio_cm_sa_ns: action.ratio_cm_sa_ns,
				max_total_ns_st_nm: action.max_total_ns_st_nm,
				max_cm_sa_st_nm: action.max_cm_sa_st_nm,
			};
		},
		setcursang(state, action) {
			state.cursang = {
				code: action.code,
				name: action.name,
				sum_cm_sa: action.sum_cm_sa,
				sum_total_ns: action.sum_total_ns,
				ratio_cm_sa_ns: action.ratio_cm_sa_ns,
				max_total_ns_st_nm: action.max_total_ns_st_nm,
				max_cm_sa_st_nm: action.max_cm_sa_st_nm,
			};
		},
	},
});

export const { setcurheang, setcursang } = curSlice.actions;
export default curSlice;

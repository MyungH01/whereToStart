import { combineReducers, configureStore } from '@reduxjs/toolkit';

import searchSlice from './search_reducer';
import geoSlice from './geo_reducer';
import curSlice from './current_reducer';
import ufavSlice from './fav_reducer';

const rootReducer = combineReducers({
	search: searchSlice.reducer,
	geo: geoSlice.reducer,
	cur: curSlice.reducer,
	ufav: ufavSlice.reducer,
});

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

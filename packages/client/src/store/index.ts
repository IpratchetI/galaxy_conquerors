import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import uiReducer from '@/store/reducers/ui/uiReducer';
import userReducer from '@/store/reducers/user/userReducer';
import leadersReducer from '@/store/reducers/leaders/leadersReducer';
import forumReducer from '@/store/reducers/forum/forumReducer';

const preloadedState = globalThis.__PRELOADED_STATE__;

const rootReducer = combineReducers({
	userState: userReducer,
	leadersState: leadersReducer,
	forumState: forumReducer,
	uiState: uiReducer
});

const store = configureStore({
	reducer: rootReducer,
	preloadedState
});
delete globalThis.__PRELOADED_STATE__;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

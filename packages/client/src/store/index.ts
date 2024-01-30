import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import userReducer from '@/store/reducers/user/userReducer';
import leadersReducer from '@/store/reducers/leaders/leadersReducer';
import forumReducer from '@/store/reducers/forum/forumReducer';

const rootReducer = combineReducers({
	userState: userReducer,
	leadersState: leadersReducer,
	forumState: forumReducer
});

const store = configureStore({
	reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '@/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const userState = (state: RootState) => state.userState;
export const forumState = (state: RootState) => state.forumState;
export const leadersState = (state: RootState) => state.leadersState;

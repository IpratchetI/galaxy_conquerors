import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUser } from '@/store/reducers/user/userActionCreator';

/**Временная реализация хука проверки и установки флага авторизации пользователя в localStorage*/
export const useAuthorize = () => {
	const { isAuth } = useAppSelector(state => state.userState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isAuth) {
			dispatch(getUser());
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('isAuthorized', isAuth.toString());
	}, [isAuth]);

	return;
};

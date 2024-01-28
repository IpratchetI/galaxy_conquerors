import { useEffect } from 'react';

import { getUser } from '@/store/reducers/user/userActionCreator';
import { useAppSelector, userState } from '@/store/selectors';
import { useAppDispatch } from '@/store';

/**Временная реализация хука проверки и установки флага авторизации пользователя в localStorage*/
export const useAuthorize = () => {
	const { isAuth } = useAppSelector(userState);
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

import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUser } from '@/store/reducers/user/userActionCreator';

type useAuthorize = () => [isAuthorized: boolean, setAuthorize: (isAuthorized: boolean) => void];

/**Временная реализация хука проверки и установки флага авторизации пользователя в localStorage*/
export const useAuthorize: useAuthorize = () => {
	const [isAuthorized, setIsAuthorized] = useState(
		JSON.parse(localStorage.getItem('isAuthorized') || 'false')
	);
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(state => state.userState);

	useEffect(() => {
		if (!user && isAuthorized) {
			dispatch(getUser());
		}
	}, [isAuthorized, user]);

	const setAuthorized = useCallback((auth: boolean) => {
		localStorage.setItem('isAuthorized', auth.toString());
		setIsAuthorized(auth);
	}, []);

	return [isAuthorized, setAuthorized] as const;
};

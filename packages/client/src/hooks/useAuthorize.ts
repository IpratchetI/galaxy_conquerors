import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { getUser } from '@/store/reducers/user/userActionCreator';

/**Временная реализация хука проверки и установки флага авторизации пользователя в localStorage*/
export const useAuthorize = () => {
	const [isAuthorized, setIsAuthorized] = useState(
		JSON.parse(localStorage.getItem('isAuthorized') || 'false')
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isAuthorized) {
			dispatch(getUser());
		}
	}, [isAuthorized]);

	const setAuthorized = useCallback((auth: boolean) => {
		localStorage.setItem('isAuthorized', auth.toString());
		setIsAuthorized(auth);
	}, []);

	return [isAuthorized, setAuthorized] as const;
};

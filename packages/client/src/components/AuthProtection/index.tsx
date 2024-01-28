import { Navigate, Outlet } from 'react-router-dom';

import { routerPaths } from '@/constants/routerPaths';
import { useAppSelector, userState } from '@/store/selectors';

export const AuthProtection = () => {
	const { isAuth } = useAppSelector(userState);

	if (!isAuth) {
		return <Navigate to={routerPaths.login} replace />;
	}

	return <Outlet />;
};

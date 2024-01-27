import { Navigate, Outlet } from 'react-router-dom';

import { routerPaths } from '@/constants/routerPaths';
import { useAppSelector } from '@/store/hooks';

export const AuthProtection = () => {
	const { isAuth } = useAppSelector(state => state.userState);

	if (!isAuth) {
		return <Navigate to={routerPaths.login} replace />;
	}

	return <Outlet />;
};

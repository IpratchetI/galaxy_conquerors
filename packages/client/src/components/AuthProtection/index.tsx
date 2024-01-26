import { Navigate, Outlet } from 'react-router-dom';

import { routerPaths } from '@/constants/routerPaths';

import { useAuth } from './AuthProvider/AuthProvider';

export const AuthProtection = () => {
	const {
		authState: [isAuthorized]
	} = useAuth();

	if (!isAuthorized) {
		return <Navigate to={routerPaths.login} replace />;
	}

	return <Outlet />;
};

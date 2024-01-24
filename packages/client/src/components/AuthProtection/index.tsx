import { Navigate, Outlet } from 'react-router-dom';
import { useAuthorize } from '@hooks/useAuthorize';

import { routerPaths } from '@/constants/routerPaths';

export const AuthProtection = () => {
	const [isAuthorized] = useAuthorize();

	if (!isAuthorized) {
		return <Navigate to={routerPaths.login} replace />;
	}

	return <Outlet />;
};

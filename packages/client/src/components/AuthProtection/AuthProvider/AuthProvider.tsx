import { createContext, ReactNode } from 'react';
import { useAuthorize } from '@hooks/useAuthorize';

const AuthContext = createContext(null);

type Props = {
	children: ReactNode;
};

export function AuthProvider({ children }: Props) {
	useAuthorize();

	return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

import { createContext, ReactNode, useContext } from 'react';
import { useAuthorize } from '@hooks/useAuthorize';

type AuthContextValue = {
	authState: ReturnType<typeof useAuthorize>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error('Authorization not provided');
	}
	return ctx;
};

type Props = {
	children: ReactNode;
};

export function AuthProvider({ children }: Props) {
	const authState = useAuthorize();

	return <AuthContext.Provider value={{ authState }}>{children}</AuthContext.Provider>;
}

import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { PostgresUserModel } from '@models/user';

import { useAppSelector, userState } from '@/store/selectors';

import { ThemeContext } from './context';
import { LOCAL_STORAGE_THEME_KEY, Theme } from './constants';

interface ThemeProviderProps {
	initialTheme?: Theme;
	children: ReactNode;
}

const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
	const { userDataBase } = useAppSelector(userState);
	const [theme, setTheme] = useState<Theme>(initialTheme || Theme.LIGHT);

	useEffect(() => {
		const themeFromStorage =
			(localStorage?.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

		if (userDataBase) {
			setTheme((userDataBase as PostgresUserModel).theme);
		} else {
			setTheme(themeFromStorage);
		}
	}, [userDataBase]);

	if (typeof window !== 'undefined') {
		document.body.className = theme;
	}

	const defaultProps = useMemo(
		() => ({
			theme,
			setTheme
		}),
		[theme]
	);

	return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;

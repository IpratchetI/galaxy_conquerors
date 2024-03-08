import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import { getUserTheme } from '@/store/reducers/theme/themeActionCreator';
import { useAppDispatch } from '@/store';

import { ThemeContext } from './context';
import { LOCAL_STORAGE_THEME_KEY, Theme } from './constants';

interface ThemeProviderProps {
	initialTheme?: Theme;
	children: ReactNode;
}

const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
	const dispatch = useAppDispatch();
	const [theme, setTheme] = useState<Theme>(initialTheme || Theme.LIGHT);

	useEffect(() => {
		const themeFromStorage =
			(localStorage?.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT; // TODO: забирать эти данные с бека вместо локал-стораджа

		if (themeFromStorage) {
			setTheme(themeFromStorage);
		}

		dispatch(getUserTheme(1));
	}, [dispatch]);

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

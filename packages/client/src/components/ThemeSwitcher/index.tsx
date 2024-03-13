import React, { memo, useCallback } from 'react';
import { Theme } from '@providers/ThemeProvider/constants';
import LightThemeIcon from '@assets/icons/theme.svg';
import PinkThemeIcon from '@assets/icons/theme-pink.svg';

import { useTheme } from '@/hooks/useTheme';
import { useAppDispatch } from '@/store';
import { Icon } from '@/components';
import { setUserTheme } from '@/store/reducers/user/userActionCreator';

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
	const { toggleTheme, theme } = useTheme();
	const dispatch = useAppDispatch();

	const onToggleHandler = useCallback(() => {
		toggleTheme(theme => {
			dispatch(setUserTheme(theme));
		});
	}, [dispatch, toggleTheme]);

	return (
		<Icon className={className} clickable size={40} onClick={onToggleHandler}>
			{theme === Theme.LIGHT ? <PinkThemeIcon /> : <LightThemeIcon />}
		</Icon>
	);
});

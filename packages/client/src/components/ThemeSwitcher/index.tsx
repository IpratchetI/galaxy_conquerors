import React, { memo, useCallback } from 'react';
import { Theme } from '@providers/ThemeProvider/constants';

import { useTheme } from '@/hooks/useTheme';
import { useAppDispatch } from '@/store';
import { Icon } from '@/components';

const LightThemeIcon = 'src/assets/icons/theme.svg';
const PinkThemeIcon = 'src/assets/icons/theme-pink.svg';

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
	const { toggleTheme, theme } = useTheme();
	const dispatch = useAppDispatch();

	const onToggleHandler = useCallback(() => {
		toggleTheme(theme => {
			// TODO: логика сохранения темы на сервере
		});
	}, [dispatch, toggleTheme]);

	return (
		<Icon
			className={className}
			svg={theme === Theme.LIGHT ? PinkThemeIcon : LightThemeIcon}
			clickable
			size={40}
			onClick={onToggleHandler}
		/>
	);
});

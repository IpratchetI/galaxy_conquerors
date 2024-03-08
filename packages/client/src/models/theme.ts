import { Theme } from '@providers/ThemeProvider/constants';

export interface ThemeUserApiModel {
	id: number | undefined;
}

export interface ThemeDataApiModel {
	user: ThemeUserApiModel;
	theme: Theme;
}

export interface ThemeState {
	themes: ThemeDataApiModel;
}

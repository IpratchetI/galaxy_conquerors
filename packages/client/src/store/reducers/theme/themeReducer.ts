import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ThemeDataApiModel, ThemeState } from '@models/theme';
import { Theme } from '@providers/ThemeProvider/constants';

const initialState: ThemeState = {
	themes: {
		theme: Theme.LIGHT,
		user: { id: undefined }
	}
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setThemes: (state: ThemeState, { payload }: PayloadAction<ThemeDataApiModel>) => {
			state.themes = payload;
		}
	}
});

export const { setThemes } = themeSlice.actions;

export default themeSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UiState = {
	sounds: boolean;
	music: boolean;
};

const initialState: UiState = {
	sounds: true,
	music: true
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setSounds: (state: UiState, action: PayloadAction<boolean>) => {
			state.sounds = action.payload;
		},
		setMusic: (state: UiState, action: PayloadAction<boolean>) => {
			state.music = action.payload;
		}
	}
});

export const { setMusic, setSounds } = uiSlice.actions;
export default uiSlice.reducer;

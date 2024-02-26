import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UiState = {
	sounds: boolean;
	music: boolean;
};

const initialState: UiState = {
	sounds: true,
	music: true
};

const storageKey = 'ui_settings';

const initStorage = () => {
	let storedSettings;
	try {
		storedSettings = JSON.parse(localStorage.getItem(storageKey) ?? '');
	} catch (error) {
		localStorage.setItem(storageKey, JSON.stringify(initialState));
		storedSettings = initialState;
	}
	return storedSettings;
};

const uiSlice = createSlice({
	name: 'ui',
	initialState: initStorage,
	reducers: {
		setSounds: (state: UiState, action: PayloadAction<boolean>) => {
			state.sounds = action.payload;
			localStorage.setItem(storageKey, JSON.stringify(state));
		},
		setMusic: (state: UiState, action: PayloadAction<boolean>) => {
			state.music = action.payload;
			localStorage.setItem(storageKey, JSON.stringify(state));
		}
	}
});

export const { setMusic, setSounds } = uiSlice.actions;
export default uiSlice.reducer;

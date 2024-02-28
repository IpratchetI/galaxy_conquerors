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

const getLocalStorage = () => {
	try {
		return JSON.parse(localStorage.getItem(storageKey) || '');
	} catch (error) {
		return initialState;
	}
};

const initStorage = () => {
	if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
		return getLocalStorage();
	} else {
		return initialState;
	}
};

const uiSlice = createSlice({
	name: 'ui',
	initialState: initStorage(),
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

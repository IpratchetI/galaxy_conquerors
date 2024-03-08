/* eslint-disable no-var, vars-on-top */
import type { TPreloadedState } from 'src/store/store';

declare module '*.scss';
declare module '*.svg';
declare module '*.png';
declare module '*.test.[ts|tsx]';

export {};

declare global {
	var __PRELOADED_STATE__: TPreloadedState;
	const __SERVER_PORT__: number;
	const __API_SERVER_HOST__: string;
}

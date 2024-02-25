/* eslint-disable no-var, vars-on-top */
import type { TPreloadedState } from 'src/store/store';

declare module '*.scss';
declare module '*.svg';
declare module '*.png';
declare module '*.test.[ts|tsx]';

export {};

declare global {
	let __PRELOADED_STATE__: TPreloadedState;
	const __SERVER_PORT__: number;
}

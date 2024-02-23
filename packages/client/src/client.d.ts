/* eslint-disable no-var, vars-on-top */
import type { TPreloadedState } from 'src/store/store';

declare const __SERVER_PORT__: number;
declare module '*.scss';
declare module '*.svg';
declare module '*.png';
declare module '*.test.[ts|tsx]';

export {};

declare global {
	var __PRELOADED_STATE__: TPreloadedState;
}

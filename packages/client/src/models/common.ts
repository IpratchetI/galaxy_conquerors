export type ValueOf<T> = T[keyof T];

export enum LoadingMeta {
	Idle = 'idle', // Process not started
	Loading = 'loading', // Process in load
	Error = 'error', // Finish with errors
	Loaded = 'loaded' // Finish success
}

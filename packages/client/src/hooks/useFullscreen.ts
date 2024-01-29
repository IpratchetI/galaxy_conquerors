import { useCallback, useEffect, useRef } from 'react';

/**
 * Хук для использования полноэкранного режима.
 * @param element DOM-элекмент, который нужно развернуть во весь экран.
 * @param keys Коды кнопок.
 * @returns Функция, разворачивающая переданный DOM-элемент во весь экран.
 */
export const useFullScreen = (
	element: React.MutableRefObject<HTMLElement | HTMLCanvasElement | null>,
	keys: string[]
) => {
	const combination = useRef(new Set());

	const toggleFullScreen = useCallback(() => {
		if (!document.fullscreenElement) {
			element.current?.requestFullscreen();
		} else if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}, [element]);

	const keydownHandler = useCallback(
		(e: KeyboardEvent) => {
			if (keys.includes(e.key)) {
				combination.current = combination.current.add(e.key);
				if (
					combination.current.size === keys.length &&
					Array.from(combination.current.values()).every(x => keys.includes(x as string))
				) {
					toggleFullScreen();
				}
			}
		},
		[toggleFullScreen, keys]
	);

	const keyupHandler = useCallback((e: KeyboardEvent) => {
		if (combination.current.has(e.key)) {
			combination.current.delete(e.key);
		}
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', keydownHandler, false);
		return () => document.removeEventListener('keydown', keydownHandler, false);
	}, [keydownHandler]);

	useEffect(() => {
		document.addEventListener('keyup', keyupHandler, false);
		return () => document.removeEventListener('keyup', keyupHandler, false);
	}, [keyupHandler]);

	return toggleFullScreen;
};

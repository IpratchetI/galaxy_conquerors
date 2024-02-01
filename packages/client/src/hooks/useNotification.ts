import { useCallback, useRef } from 'react';
import shipIcon from '@assets/icons/ship.png';

interface useNotificationOptions {
	onClick?: () => void;
}

const title = 'Galaxy Conquerors';

const createNotification = (text: string) => {
	return new Notification(title, {
		icon: shipIcon,
		body: text
	});
};

/**
 * Хук для отображения уведомлений
 * @param options Опции уведомления
 * @returns Функция, которя принимает текст сообщения и вызывает уведомление
 */
export const useNotification = (options: useNotificationOptions) => {
	const notification = useRef<Notification>();

	const notify = useCallback(
		(text: string) => {
			if (!('Notification' in window)) {
				return;
			}

			if (Notification.permission === 'granted') {
				notification.current = createNotification(text);
			} else if (Notification.permission !== 'denied') {
				Notification.requestPermission().then(permission => {
					if (permission === 'granted') {
						notification.current = createNotification(text);
					}
				});
			}

			if (notification.current) {
				notification.current.addEventListener('click', () => {
					options.onClick?.();
				});
			}
		},
		[options]
	);

	return notify;
};

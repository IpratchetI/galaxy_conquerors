type useAuthorize = () => [isAuthorized: boolean, setAuthorize: (isAuthorized: boolean) => void];

export const useAuthorize: useAuthorize = () => {
	/**Временная реализация хука проверки и установки флага авторизации пользователя в localStorage*/
	const setAuthorized = (isAuthorized: boolean) => {
		localStorage.setItem('isAuthorized', isAuthorized.toString());
	};

	return [JSON.parse(localStorage.getItem('isAuthorized') || 'false'), setAuthorized];
};

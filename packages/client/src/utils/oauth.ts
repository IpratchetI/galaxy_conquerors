export const getOauthProviderUri = (service_id: string, redirectUri: string) => {
	return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${redirectUri}`;
};

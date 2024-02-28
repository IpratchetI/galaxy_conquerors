import { BASE_API } from '@/constants/baseApi';

export const createAvatarPath = (avatar?: string) => {
	return BASE_API + 'resources' + avatar;
};

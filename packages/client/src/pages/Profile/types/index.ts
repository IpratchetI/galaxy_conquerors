import { profileApiEndpoints } from '../constants';

export type ProfileApiEndpoints = typeof profileApiEndpoints;
export type AvatarEndpoint = ProfileApiEndpoints['avatar'];
export type ProfileDataEndpoint = ProfileApiEndpoints['profileData'];
export type SaveProfileEndpoint = ProfileApiEndpoints['saveProfile'];

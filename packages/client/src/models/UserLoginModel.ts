import { UserModel } from '@models/UserModel';

/**Модель данных для авторизации Пользователя */
export type UserLoginModel = Pick<UserModel, 'login' | 'password'>;

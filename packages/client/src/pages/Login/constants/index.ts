import { UserLoginModel } from '@models/user';

import { FormField } from '@/types/forms';
import { LOGIN_PATTERN, PASSWORD_PATTERN } from '@/constants/forms';

export const loginInputsConfig: FormField<UserLoginModel>[] = [
	{
		data: {
			fieldName: 'login',
			label: 'login',
			type: 'text',
			testId: 'login_input_first-name'
		},
		validateOptions: { required: true, pattern: LOGIN_PATTERN }
	},
	{
		data: {
			fieldName: 'password',
			label: 'password',
			type: 'password',
			testId: 'login_input_password'
		},
		validateOptions: { required: true, pattern: PASSWORD_PATTERN }
	}
];

export const loginInputsDefaults: UserLoginModel = {
	login: '',
	password: ''
};

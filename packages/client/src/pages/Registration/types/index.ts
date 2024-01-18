import { RegisterOptions } from 'react-hook-form';
import { UserModel } from '@models/UserModel';
import { HTMLInputTypeAttribute } from 'react';

export type FormField = {
	data: {
		fieldName: keyof UserModel;
		label: string;
		type: HTMLInputTypeAttribute;
	};
	validateOptions: RegisterOptions;
};

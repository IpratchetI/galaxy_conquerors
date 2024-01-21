import { RegisterOptions } from 'react-hook-form';
import { HTMLInputTypeAttribute } from 'react';

export type FormField<T> = {
	data: {
		fieldName: keyof T;
		label: string;
		type: HTMLInputTypeAttribute;
	};
	validateOptions: RegisterOptions;
};

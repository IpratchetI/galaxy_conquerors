import {
	EMAIL,
	LATIN_LETTERS,
	NUMBERS,
	ONLY_NUMBERS,
	PHONE,
	SPECIAL_SYMBOLS,
	UPPERCASE_LETTERS
} from './constants';

const validateNotNumbers = (value?: string) => {
	if (!value) return '';
	if (ONLY_NUMBERS.test(value.trim())) return 'Поле не может состоять только из цифр';
	return '';
};

const validateEmail = (value?: string) => {
	if (!value) return '';
	const trimmed = value.trim();
	if (!EMAIL.test(trimmed)) return 'Некорректный email';
	return '';
};

const validatePassword = (value?: string) => {
	if (!value) return '';
	const trimmed = value.trim();
	if (trimmed.length > 40 || trimmed.length < 8)
		return 'Длина пароля должна быть от 8 до 40 символов';
	if (!NUMBERS.test(trimmed)) return 'В пароле должно быть хотя бы одно число';
	if (!UPPERCASE_LETTERS.test(trimmed)) return 'В пароле должна быть хотя бы одна заглавная буква';
	return '';
};

const validateLogin = (value?: string) => {
	if (!value) return '';
	const valueWithoutSpaces = value.trim();
	if (valueWithoutSpaces.length > 20 || valueWithoutSpaces.length < 3)
		return 'Длина логина должна быть от 3 до 20 символов';
	const notNumbersError = validateNotNumbers(valueWithoutSpaces);
	if (notNumbersError) return notNumbersError;
	if (SPECIAL_SYMBOLS.test(valueWithoutSpaces)) return 'Поле не должно содержать спецсимволы';
	if (LATIN_LETTERS.test(valueWithoutSpaces)) return 'Поле должно быть написано латиницей';
	return '';
};

const validateName = (value?: string) => {
	if (!value) return '';
	const valueWithoutSpaces = value.trim();
	if (SPECIAL_SYMBOLS.test(valueWithoutSpaces) || NUMBERS.test(valueWithoutSpaces))
		return 'Поле не должно содержать спецсимволы или цифры';
	if (!UPPERCASE_LETTERS.test(valueWithoutSpaces)) return 'Поле должно начинаться с большой буквы';
	return '';
};

const validatePhone = (value?: string) => {
	if (!value) return '';
	const valueWithoutSpaces = value.trim();
	if (valueWithoutSpaces.length > 15 || valueWithoutSpaces.length < 10)
		return 'Длина телефона должна быть от 10 до 15 символов';
	if (!PHONE.test(valueWithoutSpaces)) return 'Поле должно состоять только из цифр';
	return '';
};

const validateNickname = (value?: string) => {
	if (!value) return '';
	const valueWithoutSpaces = value.trim();
	if (valueWithoutSpaces.length < 3) return 'Длина никнейма должна быть больше 3 символов';
	const notNumbersError = validateNotNumbers(valueWithoutSpaces);
	if (notNumbersError) return notNumbersError;
	if (SPECIAL_SYMBOLS.test(valueWithoutSpaces)) return 'Поле не должно содержать спецсимволы';
	return '';
};

const validateMessage = (value?: string) => {
	if (!value) return 'Сообщение не может быть пустым';
	return '';
};

export const validate = (name: string, value: string, required?: boolean) => {
	if (value === '' && required) {
		return 'Заполните поле';
	}

	switch (name) {
		case 'email':
			return validateEmail(value);
		case 'login':
			return validateLogin(value);
		case 'first_name':
		case 'second_name':
			return validateName(value);
		case 'phone':
			return validatePhone(value);
		case 'password':
		case 'new_password':
		case 'old_password':
			return validatePassword(value);
		case 'display_name':
			return validateNickname(value);
		case 'message':
			return validateMessage(value);
		default:
			return '';
	}
};

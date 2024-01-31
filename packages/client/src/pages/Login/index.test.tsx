import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { TestWrapper } from '@/test/components/TestWrapper';

import { Login } from './';

describe('Login Page', () => {
	let usernameInput: HTMLInputElement;
	let passwordInput: HTMLInputElement;

	beforeEach(() => {
		render(
			<TestWrapper>
				<Login />
			</TestWrapper>
		);

		usernameInput = screen.getByTestId('login_input_first-name');
		passwordInput = screen.getByTestId('login_input_password');
	});

	test('should render error text for login & password on blur', async () => {
		// Пользователь вводит значение из двух символов. Минимум - 3
		fireEvent.change(usernameInput, { target: { value: 'ab' } });
		fireEvent.blur(usernameInput);

		// Пользователь вводит значение из шести символов. Минимум - 8
		fireEvent.change(passwordInput, { target: { value: '312dad' } });
		fireEvent.blur(passwordInput);

		await waitFor(() => {
			expect(screen.getByText('Длина логина должна быть от 3 до 20 символов')).toBeDefined();
			expect(screen.getByText('Длина пароля должна быть от 8 до 40 символов')).toBeDefined();
		});
	});

	test('should render error text for login & password on submit', async () => {
		const submitButton = screen.getByText('Sign In');

		// Поле не должно содержать спец символы
		fireEvent.change(usernameInput, { target: { value: 'dsad@!' } });

		// Пользователь вводит значение без чисел. Необходимо хотя бы одно
		fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });

		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText('Поле не должно содержать спецсимволы')).toBeDefined();
			expect(screen.getByText('В пароле должно быть хотя бы одно число')).toBeDefined();
		});
	});

	test('should render default', () => {
		const { container } = render(
			<TestWrapper>
				<Login />
			</TestWrapper>
		);

		expect(container).toMatchSnapshot();
	});
});

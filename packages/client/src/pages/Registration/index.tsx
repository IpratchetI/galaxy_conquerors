import { useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Spacer } from '@components/Spacer';
import { UserLoginModel, UserRegistrationModel } from '@models/User';
import { FormCard } from '@components/FormCard';
import { AuthService } from '@services/authService';
import { useAuthorize } from '@hooks/useAuthorize';
import { useNavigate } from 'react-router-dom';

import { routerPaths } from '@/constants/routerPaths';
import { regInputsConfig, regInputsDefaults } from '@/pages/Registration/constants';
import { validate } from '@/utils/validate';

import '@styles/main.scss';
import styles from './index.module.scss';

export const Registration = () => {
	const [, setAuthorized] = useAuthorize();

	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors: validateErrors }
	} = useForm<UserRegistrationModel>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: regInputsDefaults
	});

	const navigate = useNavigate();

	const submitHandler = (data: UserLoginModel) => {
		AuthService.signUp(data).then(() => {
			setAuthorized(true);
			navigate(routerPaths.main);
		});
	};

	const registerHandler = () => submitHandler(getValues());

	return (
		<main className={styles.registration}>
			<Spacer fullHeight>
				<FormCard
					text="Registration"
					fullWidthContent
					footer={
						<Spacer gap="20">
							<Button type="submit" onClick={handleSubmit(registerHandler)}>
								Register
							</Button>
							<Button onClick={() => navigate(-1)}>Back</Button>
						</Spacer>
					}>
					<form>
						{regInputsConfig.map(({ data: { fieldName, label, type }, validateOptions }, index) => {
							const error = validateErrors[fieldName];
							const value = getValues()[fieldName];
							const isFieldRequired = Boolean(validateOptions.required);

							return (
								<Spacer key={`${fieldName}-${index}`} fullWidth>
									<Input
										key={fieldName}
										type={type}
										error={
											error && {
												message: validate(fieldName, value, isFieldRequired)
											}
										}
										{...register(fieldName, validateOptions)}>
										{label}
									</Input>
								</Spacer>
							);
						})}
					</form>
				</FormCard>
			</Spacer>
		</main>
	);
};

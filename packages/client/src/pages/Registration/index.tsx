import { useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Spacer } from '@components/Spacer';
import { UserModel } from '@models/User';
import { regInputsConfig, regInputsDefaults } from '@pages/Registration/constants';
import { FormCard } from '@components/FormCard';

import { validate } from '@/utils/validate';

import '@styles/main.scss';
import styles from './index.module.scss';

export const Registration = () => {
	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors: validateErrors }
	} = useForm<UserModel>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: regInputsDefaults
	});

	const submitHandler = () => {
		getValues();

		console.log(getValues());
	};

	return (
		<main className={styles.registration}>
			<Spacer fullHeight>
				<FormCard
					text="Registration"
					fullWidthContent
					footer={
						<Spacer gap="20">
							<Button type="submit" onClick={handleSubmit(submitHandler)}>
								Register
							</Button>
							<Button>Back</Button>
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

import { useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Spacer } from '@components/Spacer';
import { Text } from '@components/Text';
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

	const submitHandler = (data: UserModel) => {
		console.log(data);
		console.log(validateErrors.first_name);
	};

	// return (
	// 	<main className={styles.registration}>
	// 		<section className={styles.formCard}>
	// 			<p className={styles.title}>Registration</p>
	// 			<div className={styles.content}>
	// 				<form onSubmit={handleSubmit(submitHandler)}>
	// 					{regInputsConfig.map(({ data: { fieldName, label, type }, validateOptions }) => (
	// 						<Spacer key={fieldName} className={styles.inputContainer} direction="column" fullWidth align="start">
	// 							<Input
	// 								type={type}
	// 								{...register(fieldName, validateOptions)}
	// 								invalid={Boolean(validateErrors[fieldName])}
	// 								label={label}
	// 								fullWidth
	// 							/>
	// 							{validateErrors[fieldName] && (
	// 								<Text className={styles.errorText} tag="p" size="xs" variant="error">
	// 									{validate(fieldName, getValues()[fieldName], true)}
	// 								</Text>
	// 							)}
	// 						</Spacer>
	// 					))}
	// 					<Spacer justify="evenly" fullWidth>
	// 						<Button title="Register" onClick={() => submitHandler(getValues())} type="submit" />
	// 						<Button title="Back" />
	// 					</Spacer>
	// 				</form>
	// 			</div>
	// 		</section>
	// 	</main>
	// );

	return (
		<main className={styles.registration}>
			<FormCard
				text={'Registration'}
				footer={
					<>
						<Button title={'Register'} onClick={() => submitHandler(getValues())}>
							{'Register'}
						</Button>
						<Button title={'Back'}>{'Back'}</Button>
					</>
				}>
				<form>
					{regInputsConfig.map(({ fieldName, label }) => (
						<Input key={fieldName} {...register(fieldName)}>
							{label}
						</Input>
					))}
				</form>
			</FormCard>
		</main>
	);
};

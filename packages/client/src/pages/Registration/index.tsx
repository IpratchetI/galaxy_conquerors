import { useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UserModel } from '@models/User';
import { regInputsConfig, regInputsDefaults } from '@pages/Registration/constants';
import { FormCard } from '@components/FormCard';
import { AuthService } from '@services/authService';
import { useAuthorize } from '@hooks/useAuthorize';
import { useNavigate } from 'react-router-dom';

import { routerPaths } from '@/constants/routerPaths';

import '@styles/main.scss';
import styles from './index.module.scss';

export const Registration = () => {
	const [, setAuthorized] = useAuthorize();
	const { register, getValues } = useForm<UserModel>({
		defaultValues: regInputsDefaults
	});

	const navigate = useNavigate();

	const submitHandler = (data: UserModel) => {
		AuthService.signUp(data).then(() => {
			setAuthorized(true);
			navigate(routerPaths.main);
		});
	};

	return (
		<main className={styles.registration}>
			<FormCard
				text={'Registration'}
				footer={
					<>
						<Button
							title={'Register'}
							className={styles.registrationButton}
							onClick={() => submitHandler(getValues())}>
							{'Register'}
						</Button>
						<Button title={'Back'} onClick={() => navigate(-1)}>
							{'Back'}
						</Button>
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

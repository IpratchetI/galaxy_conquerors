import React from 'react';
import { Button, ButtonVariant } from '@components/Button';
import { useNavigate } from 'react-router-dom';

import { Modal, Spacer } from '@/components';
import { routerPaths } from '@/constants/routerPaths';

import styles from './index.module.scss';

interface BreakPopupProps {
	onClose: () => void;
	destroyedEnemiesCount: () => void;
	isOpen?: boolean;
}

export const BreakGamePopup: React.FC<BreakPopupProps> = ({
	onClose,
	destroyedEnemiesCount,
	isOpen = false
}) => {
	const navigate = useNavigate();

	const handleBackClick = () => {
		onClose();
	};
	const handleConfirmClick = () => {
		//TODO изменить после добавления store
		sessionStorage.setItem('destroyedEnemiesCount', `${destroyedEnemiesCount()}`);
		navigate(routerPaths.gameOver);
	};

	return (
		<Modal isOpen={isOpen} onClose={handleBackClick}>
			<Spacer align="center" direction="column" gap="50">
				<p className={styles.text}>
					Do you really
					<br />
					want
					<br />
					to exit?
				</p>
				<p className={styles.text}>Progress will be lost</p>
				<Spacer align="center" direction="column" gap="20">
					<Button variant={ButtonVariant.TEXT} onClick={handleConfirmClick}>
						Confirm
					</Button>
					<Button variant={ButtonVariant.TEXT} onClick={handleBackClick}>
						Cancel
					</Button>
				</Spacer>
			</Spacer>
		</Modal>
	);
};

import React from 'react';
import { Button, ButtonVariant } from '@components/Button';
import { useNavigate } from 'react-router-dom';

import { Modal, Spacer, Text } from '@/components';

import { routerPaths } from '@/constants/routerPaths';

interface BreakPopupProps {
	onClose: () => void;
	setScore: (score: number) => void;
	destroyedEnemiesCount: (() => number) | undefined;
	isOpen?: boolean;
}

export const BreakGamePopup: React.FC<BreakPopupProps> = ({
	onClose,
	setScore,
	destroyedEnemiesCount,
	isOpen = false
}) => {
	const navigate = useNavigate();

	const handleBackClick = () => {
		onClose();
	};
	const handleConfirmClick = () => {
		destroyedEnemiesCount && setScore(destroyedEnemiesCount());
		navigate(`${routerPaths.main}${routerPaths.gameOver}`);
	};

	return (
		<Modal isOpen={isOpen} onClose={handleBackClick}>
			<Spacer align="center" direction="column" gap="50">
				<Text tag="h1" align="center">
					{'Do you really \n want \n to exit?'}
				</Text>
				<Text tag="h1" align="center">
					Progress will be lost
				</Text>
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

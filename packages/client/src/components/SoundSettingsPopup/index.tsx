import React from 'react';
import { Button, ButtonVariant } from '@components/Button';

import { Modal, Spacer, Text } from '@/components';
import { useAppDispatch } from '@/store';
import { setSounds } from '@/store/reducers/ui/uiActionCreator';
import { setMusic } from '@/store/reducers/ui/uiReducer';
import { useAppSelector, uiState } from '@/store/selectors';

import styles from './index.module.scss';

interface BreakPopupProps {
	onClose: () => void;
	isOpen?: boolean;
}

export const SoundSettingsPopup = (props: BreakPopupProps) => {
	const dispatch = useAppDispatch();
	const { music, sounds } = useAppSelector(uiState);

	const handleBackClick = () => {
		props.onClose();
	};

	const soundsChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSounds(e.target.value === 'true' ? true : false));
	};

	const musicChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setMusic(e.target.value === 'true' ? true : false));
	};

	return (
		<Modal className={styles.soundModal} isOpen={props.isOpen} onClose={handleBackClick}>
			<Spacer align="center" direction="column" gap="50">
				<Text tag="h1" align="center">
					Sounds
				</Text>
				<Spacer gap="16" align="center" justify="between">
					<input
						type="radio"
						name="sounds"
						id="soundsOn"
						value="true"
						checked={sounds}
						onChange={soundsChangeHandler}
					/>
					<label htmlFor="soundsOn">on</label>
					<input
						type="radio"
						name="sounds"
						id="soundsOff"
						value="false"
						checked={!sounds}
						onChange={soundsChangeHandler}
					/>
					<label htmlFor="soundsOff">off</label>
				</Spacer>
				<Text tag="h1" align="center">
					Music
				</Text>
				<Spacer gap="16" align="center">
					<input
						type="radio"
						name="music"
						id="musicOn"
						value="true"
						checked={music}
						onChange={musicChangeHandler}
					/>
					<label htmlFor="musicOn">on</label>
					<input
						type="radio"
						name="music"
						id="musicOff"
						value="false"
						checked={!music}
						onChange={musicChangeHandler}
					/>
					<label htmlFor="musicOff">off</label>
				</Spacer>
				<Button variant={ButtonVariant.TEXT} onClick={handleBackClick}>
					Close
				</Button>
			</Spacer>
		</Modal>
	);
};

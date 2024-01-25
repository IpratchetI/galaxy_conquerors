import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@components/Button';

import AvatarService from '@/services/avatarService';
import { Spacer } from '@/components';

import styles from './index.module.scss';

interface AvatarProps {
	avatarUrl: string;
}

const Avatar: React.FC<AvatarProps> = ({ avatarUrl }) => {
	const [isPopupOpen, setPopupOpen] = useState(false);
	const [isOverlayVisible, setOverlayVisible] = useState(false);
	const avatarRef = useRef<HTMLDivElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const avatarService = new AvatarService();

	const handleAvatarClick = () => {
		setPopupOpen(true);
		setOverlayVisible(true);
	};

	const handleImageClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			try {
				await avatarService.uploadAvatar(file);

				console.log('File uploaded successfully');
			} catch (error) {
				console.error('Error during file upload:', error);
			}
		}

		setPopupOpen(false);
		setOverlayVisible(false);
	};

	const handleBackClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setPopupOpen(false);
		setOverlayVisible(false);
	};

	const handleOutsideClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement;

		if (!avatarRef.current?.contains(target)) {
			setPopupOpen(false);
			setOverlayVisible(false);
		}
	};

	useEffect(() => {
		window.addEventListener('click', handleOutsideClick);
		return () => {
			window.removeEventListener('click', handleOutsideClick);
		};
	}, []);

	return (
		<div className={styles.avatarContainer} ref={avatarRef} onClick={handleAvatarClick}>
			<div className={styles.avatarMock} style={{ backgroundImage: `url(${avatarUrl})` }}></div>
			{isOverlayVisible && <div className={styles.overlay}></div>}
			{isPopupOpen && (
				<div className={styles.avatarPopup} onClick={e => e.stopPropagation()}>
					<Spacer direction="column" fullHeight gap="50">
						<Button onClick={handleImageClick} text="Image" />
						<Button onClick={handleBackClick} text="Back" />
						<input
							type="file"
							ref={fileInputRef}
							style={{ display: 'none' }}
							onChange={handleFileChange}
							accept=".jpeg, .jpg, .png, .gif, .webp"
						/>
					</Spacer>
				</div>
			)}
		</div>
	);
};

export default Avatar;

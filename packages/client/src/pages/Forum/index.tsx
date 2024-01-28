import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Spacer, Text } from '@/components';

import s from './index.module.scss';
import { TOPICS_LIST } from './lib/mocks';
import { TopicsList } from './components/TopicsList';
import { NewTopicForm } from './components/NewTopicForm';

export const ForumPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

	const handleOpenTopicCreator = () => {
		setIsModalOpen(prevState => !prevState);
	};

	return (
		<div className={s.forumPage}>
			<Text tag="h2" size="l" className={s.title}>
				Forum
			</Text>
			<TopicsList />
			<Spacer className={s.buttons} justify="between">
				<Button onClick={() => navigate(-1)}>Back</Button>
				<Button onClick={handleOpenTopicCreator}>Add new theme</Button>
			</Spacer>

			<Modal className={s.forumModal} isOpen={isModalOpen} onClose={handleOpenTopicCreator}>
				<NewTopicForm onClick={handleOpenTopicCreator} />
			</Modal>
		</div>
	);
};

import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { useState } from 'react';

import { Spacer, Text } from '@/components';

import s from './index.module.scss';
import { TOPICS_LIST } from './lib/mocks';
import { TopicsList } from './components/TopicsList';
import { NewTopicForm } from './components/NewTopicForm';

export const ForumPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenTopicCreator = () => {
		setIsModalOpen(prevState => !prevState);
	};

	const handleHistoryBack = () => {
		// todo: add back
	};

	return (
		<div className={s.forumPage}>
			<Text tag="h2" size="l" className={s.title}>
				Forum
			</Text>
			<TopicsList topics={TOPICS_LIST} />
			<Spacer className={s.buttons} justify="between">
				<Button onClick={handleHistoryBack}>Back</Button>
				<Button onClick={handleOpenTopicCreator}>Add new theme</Button>
			</Spacer>

			<Modal className={s.forumModal} isOpen={isModalOpen} onClose={handleOpenTopicCreator}>
				<NewTopicForm onClick={handleOpenTopicCreator} />
			</Modal>
		</div>
	);
};

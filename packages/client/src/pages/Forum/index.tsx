import { Button } from '../../components/Button';
import { Modal } from '@components/Modal';
import { useState } from 'react';

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
			<h2 className={s.title}>Forum</h2>
			<TopicsList topics={TOPICS_LIST} />
			<div className={s.buttons}>
				<Button onClick={handleHistoryBack}>Back</Button>
				<Button onClick={handleOpenTopicCreator}>Add new theme</Button>
			</div>

			<Modal className={s.forumModal} isOpen={isModalOpen} onClose={handleOpenTopicCreator}>
				<NewTopicForm onClick={handleOpenTopicCreator} />
			</Modal>
		</div>
	);
};

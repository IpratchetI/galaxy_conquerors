import s from './index.module.scss';
import { TOPICS_LIST } from './lib/constants';
import { TopicsList } from './components/TopicsList/TopicsList';
import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { useState } from 'react';
import { NewTopicForm } from './components/NewTopicForm/NewTopicForm';

export const ForumPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenTopicCreator = () => {
		setIsModalOpen(prevState => !prevState);
	};

	const handleHistoryBack = () => {
		// todo: add back
	};

	return (
		<div className={s.ForumPage}>
			<h2 className={s.Title}>Forum</h2>
			<TopicsList topics={TOPICS_LIST} />
			<div className={s.Buttons}>
				<Button onClick={handleHistoryBack}>Back</Button>
				<Button onClick={handleOpenTopicCreator}>Add new theme</Button>
			</div>

			<Modal className={s.ForumModal} isOpen={isModalOpen} onClose={handleOpenTopicCreator}>
				<NewTopicForm onClick={handleOpenTopicCreator} />
			</Modal>
		</div>
	);
};

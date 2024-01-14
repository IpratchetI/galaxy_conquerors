import s from './ForumPage.module.scss';
import { TOPICS_LIST } from './lib/constants';
import { TopicsList } from './components/TopicsList/TopicsList';
import { Button } from '@components/Button/Button';
import { Modal } from '@components/Modal/Modal';
import { useState } from 'react';
import { NewTopicForm } from './components/NewTopicForm/NewTopicForm';

export const ForumPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenTopicCreator = () => {
		setIsModalOpen(prevState => !prevState);
	};

	return (
		<div className={s.Page}>
			<h2 className={s.Title}>Forum</h2>
			<TopicsList topics={TOPICS_LIST} />
			<div className={s.Buttons}>
				<Button>Back</Button>
				<Button onClick={handleOpenTopicCreator}>Add new theme</Button>
			</div>

			<Modal
				className={s.ForumModal}
				isOpen={isModalOpen}
				onClose={handleOpenTopicCreator}>
				<NewTopicForm onClick={handleOpenTopicCreator} />
			</Modal>
		</div>
	);
};

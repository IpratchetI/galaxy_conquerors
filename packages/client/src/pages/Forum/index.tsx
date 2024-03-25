import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Spacer, Text } from '@/components';
import { useAppDispatch } from '@/store';
import { getTopicsList } from '@/store/reducers/forum/forumReducer';

import { TopicsList } from './components/TopicsList';
import { NewTopicForm } from './components/NewTopicForm';
import { TOPICS_LIST } from './lib/mocks';
import s from './index.module.scss';

export const ForumPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getTopicsList(TOPICS_LIST));
	}, []);

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

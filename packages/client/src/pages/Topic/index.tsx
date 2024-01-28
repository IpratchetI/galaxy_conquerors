import { Button } from '@components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { TOPICS_LIST } from '@pages/Forum/lib/mocks';

import { Text } from '@/components';
import { getTopic } from '@/store/reducers/forum/forumReducer';
import { forumState, useAppSelector } from '@/store/selectors';
import { useAppDispatch } from '@/store';

import s from './index.module.scss';
import { MessageForm } from './components/MessageForm';
import { Comment } from './components/Comment';

export const TopicPage = () => {
	const { currentTopic, isLoading, topicError } = useAppSelector(forumState);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { topicId } = useParams();

	useEffect(() => {
		if (!topicId) return;

		const selectedTopic = TOPICS_LIST?.find(topic => topic.id === +topicId);

		if (selectedTopic) {
			dispatch(getTopic(selectedTopic));
		}
	}, [topicId]);

	const handleHistoryBack = () => {
		navigate(-1);
	};

	if (isLoading) {
		return (
			<Text align="center" size="m">
				Loading...
			</Text>
		);
	}

	if (topicError?.reason) {
		return (
			<Text size="s" variant="error">
				{topicError?.reason}
			</Text>
		);
	}

	return (
		<div className={s.topicPage}>
			<h2 className={s.title}>Interesting projects</h2>
			<div className={s.topicContent}>
				{currentTopic?.comments?.map(comment => (
					<Comment key={comment.id} {...comment} />
				))}
			</div>
			<div className={s.actions}>
				<Button className={s.backButton} onClick={handleHistoryBack} text="Back" />
				<MessageForm />
			</div>
		</div>
	);
};

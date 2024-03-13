import { Button } from '@components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import { Text } from '@/components';
import { forumState, useAppSelector } from '@/store/selectors';

import s from './index.module.scss';
import { MessageForm } from './components/MessageForm';
import { Comment } from './components/Comment';
import s from './index.module.scss';

export const TopicPage = () => {
	const { topics, isLoading, topicError } = useAppSelector(forumState);
	const navigate = useNavigate();
	const containerRef = useRef<HTMLDivElement>(null);
	const { topicId } = useParams();
	const currentTopic = topics.find(topic => topic.id === parseInt(topicId!, 10));

	const handleHistoryBack = () => {
		navigate(-1);
	};
	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop =
				containerRef.current.scrollHeight - containerRef.current.clientHeight;
		}
	}, [currentTopic]);

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
			<h2 className={s.title}>{currentTopic?.name}</h2>
			<div className={s.topicContent} ref={containerRef}>
				{currentTopic?.comments?.map(comment => (
					<Comment key={comment.id} authorName={currentTopic.users[comment.userId]} {...comment} />
				))}
			</div>
			<div className={s.actions}>
				<Button className={s.backButton} onClick={handleHistoryBack} text="Back" />
				<MessageForm />
			</div>
		</div>
	);
};

import { Button } from '@components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Text } from '@/components';
import { forumState, useAppSelector } from '@/store/selectors';

import { MessageForm } from './components/MessageForm';
import { Comment } from './components/Comment';
import s from './index.module.scss';
import { UNTITLED } from '@/constants/text';
import { useAppDispatch } from '@/store';
import { getCommentsList, getTopic } from '@/store/reducers/forum/forumActionCreator';

export const TopicPage = () => {
	const { currentTopic, isLoading, topicError } = useAppSelector(forumState);
	const navigate = useNavigate();
	const containerRef = useRef<HTMLDivElement>(null);
	const { topicId } = useParams();
	const dispatch = useAppDispatch();

	const handleHistoryBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop =
				containerRef.current.scrollHeight - containerRef.current.clientHeight;
		}
	}, [currentTopic]);

	useEffect(() => {
		if (!currentTopic && topicId) {
			dispatch(getTopic(Number(topicId)));
		}

		if (currentTopic && !currentTopic.comments) {
			dispatch(
				getCommentsList({
					topicId: currentTopic.id
				})
			);
		}
	}, [currentTopic, topicId]);

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
			<h2 className={s.title}>{currentTopic?.title ?? UNTITLED}</h2>
			<div className={s.topicContent} ref={containerRef}>
				{currentTopic?.comments?.map(comment => (
					<Comment key={comment.id} comment={comment} />
				))}
			</div>
			<div className={s.actions}>
				<Button className={s.backButton} onClick={handleHistoryBack} text="Back" />
				<MessageForm />
			</div>
		</div>
	);
};

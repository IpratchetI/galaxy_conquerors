import { useCallback, useEffect } from 'react';
import { Link } from '@components/Link';
import { TopicModel } from '@models/topics';

import { Text } from '@/components';
import { getTopic, getTopicsList } from '@/store/reducers/forum/forumActionCreator';
import { forumState, useAppSelector } from '@/store/selectors';
import { useAppDispatch } from '@/store';

import s from './index.module.scss';

import { TopicsHeader } from '../TopicsHeader';
import { abbreviateNumber } from '@/utils/abbreviateNumber';
import { UNTITLED } from '@/constants/text';

export const TopicsList = () => {
	const { topics, error: forumError, isLoading } = useAppSelector(forumState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			getTopicsList({
				limit: 10,
				offset: 0
			})
		);
	}, []);

	const handleClick = useCallback(
		(topicId: TopicModel['id']) => {
			const selectedTopic = topics?.find(topic => topic.id === topicId);

			if (selectedTopic) {
				dispatch(getTopic(selectedTopic?.id));
			}
		},
		[topics]
	);

	if (isLoading) {
		return (
			<Text align="center" size="m">
				Loading...
			</Text>
		);
	}

	if (forumError?.reason) {
		return (
			<Text size="s" variant="error">
				{forumError?.reason}
			</Text>
		);
	}

	return (
		<div className={s.topics}>
			<TopicsHeader className={s.topic} />
			<ul className={s.topicsList} aria-label="forum-topics-list">
				{topics?.map((topic, i) => {
					const topicName = topic.title ?? UNTITLED;

					return (
						<li key={topic.id} className={s.topicItem} title={topicName}>
							<Link
								to={`topic/${topic.id}`}
								state={{
									topicName: topicName
								}}
								className={s.topic}
								onClick={() => handleClick(topic.id)}>
								<span className={s.topicName}>{topicName}</span>
								<span>{topic.commentsCount ? abbreviateNumber(topic.commentsCount, 0) : 0}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

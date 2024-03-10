import { useCallback } from 'react';
import { Link } from '@components/Link';
import { TopicModel } from '@models/topics';

import { abbreviateNumber } from '@/utils/abbreviateNumber';
import { Text } from '@/components';
import { getTopic } from '@/store/reducers/forum/forumReducer';
import { forumState, useAppSelector } from '@/store/selectors';
import { useAppDispatch } from '@/store';

import s from './index.module.scss';

import { TopicsHeader } from '../TopicsHeader';

export const TopicsList = () => {
	const { topics, error: forumError, isLoading } = useAppSelector(forumState);
	const dispatch = useAppDispatch();

	const handleClick = useCallback(
		(topicId: TopicModel['id']) => {
			const selectedTopic = topics?.find(topic => topic.id === topicId);

			if (selectedTopic) {
				dispatch(getTopic(selectedTopic.id));
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
				{topics?.map(topic => (
					<li key={topic.id} className={s.topicItem} title={topic.name}>
						<Link
							to={`topic/${topic.id}`}
							state={{
								topicName: topic.name
							}}
							className={s.topic}
							onClick={() => handleClick(topic.id)}>
							<span className={s.topicName}>{topic.name}</span>
							<span>{abbreviateNumber(topic.length, 0)}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

import React, { useCallback, useEffect } from 'react';
import { Link } from '@components/Link';
import { LoadingMeta } from '@models/common';
import { TopicModel } from '@models/models/topics';
import { TOPICS_LIST } from '@pages/Forum/lib/mocks';

import { abbreviateNumber } from '@/utils/abbreviateNumber';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Text } from '@/components';
import { getTopicsList, getTopic } from '@/store/reducers/forum/forumReducer';

import s from './index.module.scss';

import { TopicsHeader } from '../TopicsHeader';

export const TopicsList = () => {
	const { topics, error: forumError, isLoading } = useAppSelector(state => state.forumState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getTopicsList(TOPICS_LIST));
	}, []);

	const handleClick = useCallback(
		(topicId: TopicModel['id']) => {
			const selectedTopic = topics?.find(topic => topic.id === topicId);

			if (selectedTopic) {
				dispatch(getTopic(selectedTopic));
			}
		},
		[topics]
	);

	if (isLoading === LoadingMeta.Loading) {
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

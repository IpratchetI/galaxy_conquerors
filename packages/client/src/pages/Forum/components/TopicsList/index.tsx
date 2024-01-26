import React, { useCallback } from 'react';
import { Link } from '@components/Link';
import { LoadingMeta } from '@models/common';
import { TopicModel } from '@models/models/topics';

import { abbreviateNumber } from '@/utils/abbreviateNumber';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Text } from '@/components';
import { selectTopic } from '@/store/reducers/forum/forumReducer';

import s from './index.module.scss';

import { TopicsHeader } from '../TopicsHeader';

export const TopicsList = () => {
	const dispatch = useAppDispatch();
	const { topics, error: forumError, isLoading } = useAppSelector(state => state.forumState);

	const handleClick = useCallback(
		(topicId: TopicModel['id']) => {
			const selectedTopic = topics?.find(topic => topic.id === topicId);

			if (selectedTopic) {
				dispatch(selectTopic(selectedTopic));
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
							<span>{abbreviateNumber(topic.comments, 0)}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

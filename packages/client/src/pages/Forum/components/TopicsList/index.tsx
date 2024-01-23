import { useCallback } from 'react';
import { Topics } from '@models/types/topics';
import { Link } from '@components/Link';
import { TOPICS_PATH } from '@pages/Forum/lib/constants';

import { abbreviateNumber } from '@/utils/abbreviateNumber';

import s from './index.module.scss';

import { TopicsHeader } from '../TopicsHeader';

type TopicsListProps = {
	topics?: Topics;
};

export const TopicsList = ({ topics }: TopicsListProps) => {
	const handleClick = useCallback(() => {
		// todo: add handler
	}, []);

	return (
		<div className={s.topics}>
			<TopicsHeader className={s.topic} />
			<ul className={s.topicsList} aria-label="forum-topics-list">
				{topics?.map(topic => (
					<li key={topic.id} className={s.topicItem} title={topic.name}>
						<Link
							href={TOPICS_PATH(topic.id)}
							state={{
								topicName: topic.name
							}}
							className={s.topic}
							onClick={handleClick}>
							<span className={s.topicName}>{topic.name}</span>
							<span>{abbreviateNumber(topic.comments, 0)}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

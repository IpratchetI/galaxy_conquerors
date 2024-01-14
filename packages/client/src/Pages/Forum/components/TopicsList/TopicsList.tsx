import { useCallback } from 'react';
import { Topics } from '@models/types/topics';
import s from './TopicsList.module.scss';
import { Link } from '@components/Link';
import { TopicsHeader } from '../TopicsHeader/TopicsHeader';
import { abbreviateNumber } from '@/utils/abbreviateNumber';

type TopicsListProps = {
	topics?: Topics;
};

export const TopicsList = ({ topics }: TopicsListProps) => {
	const handleClick = useCallback(() => {
		// todo: add handler
	}, []);

	return (
		<div className={s.Topics}>
			<TopicsHeader className={s.Topic} />
			<ul className={s.TopicsList} aria-label="forum-topics-list">
				{topics?.map(topic => (
					<li key={topic.id} className={s.TopicItem} title={topic.name}>
						<Link
							href={`/forum/${topic.id}`}
							params={{
								topicName: topic.name,
							}}
							className={s.Topic}
							onClick={handleClick}>
							<span className={s.TopicName}>{topic.name}</span>
							<span>{abbreviateNumber(topic.comments, 0)}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

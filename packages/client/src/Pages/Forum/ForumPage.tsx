import s from './ForumPage.module.scss';
import { TOPICS_LIST } from './lib/constants';
import { TopicsList } from './components/TopicsList/TopicsList';

export const ForumPage = () => {
	return (
		<div className={s.Page}>
			<h2 className={s.Title}>Forum</h2>
			<TopicsList topics={TOPICS_LIST} />
		</div>
	);
};

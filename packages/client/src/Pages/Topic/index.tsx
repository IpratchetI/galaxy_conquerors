import s from './index.module.scss';
import { Button } from '@components/Button';
import { MessageForm } from './components/MessageForm/MessageForm';
import { COMMENTS_LIST } from '@pages/Topic/lib/constants';
import { Comment } from './components/Comment/Comment';

export const TopicPage = () => {
	const handleHistoryBack = () => {
		// todo: add back
	};

	return (
		<div className={s.TopicPage}>
			<h2 className={s.Title}>Interesting projects</h2>
			<div className={s.TopicContent}>
				{COMMENTS_LIST.map(comment => (
					<Comment key={comment.id} {...comment} />
				))}
			</div>
			<div className={s.Actions}>
				<Button className={s.BackButton} onClick={handleHistoryBack}>
					Back
				</Button>
				<MessageForm />
			</div>
		</div>
	);
};

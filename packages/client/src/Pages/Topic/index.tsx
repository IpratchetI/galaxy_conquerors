import { Button } from '@components/Button';

import s from './index.module.scss';
import { MessageForm } from './components/MessageForm';
import { COMMENTS_LIST } from './lib/mocks';
import { Comment } from './components/Comment';

export const TopicPage = () => {
	const handleHistoryBack = () => {
		// todo: add back
	};

	return (
		<div className={s.topicPage}>
			<h2 className={s.title}>Interesting projects</h2>
			<div className={s.topicContent}>
				{COMMENTS_LIST.map(comment => (
					<Comment key={comment.id} {...comment} />
				))}
			</div>
			<div className={s.actions}>
				<Button className={s.backButton} onClick={handleHistoryBack}>
					Back
				</Button>
				<MessageForm />
			</div>
		</div>
	);
};

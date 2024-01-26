import { Button } from '@components/Button';
import { useNavigate } from 'react-router-dom';
import { LoadingMeta } from '@models/common';

import { useAppSelector } from '@/store/hooks';
import { Text } from '@/components';

import s from './index.module.scss';
import { MessageForm } from './components/MessageForm';
import { Comment } from './components/Comment';

// todo: получать/пополнять список сообщений
export const TopicPage = () => {
	const { currentTopic, isLoading, topicError } = useAppSelector(state => state.forumState);
	const navigate = useNavigate();

	const handleHistoryBack = () => {
		navigate(-1);
	};

	if (isLoading === LoadingMeta.Loading) {
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
			<h2 className={s.title}>Interesting projects</h2>
			<div className={s.topicContent}>
				{currentTopic?.comments?.map(comment => (
					<Comment key={comment.id} {...comment} />
				))}
			</div>
			<div className={s.actions}>
				<Button className={s.backButton} onClick={handleHistoryBack} text="Back" />
				<MessageForm />
			</div>
		</div>
	);
};

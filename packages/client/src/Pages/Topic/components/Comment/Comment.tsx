import { useMemo } from 'react';
import classNames from 'classnames';
import s from './Comment.module.scss';
import { IComment } from '@models/types/topics';
import { CURRENT_USER_ID, USERS } from '../../lib/constants';
import { SmileMenu } from '../SmileMenu/SmileMenu';
import { Spacer } from '@/components';

type CommentProps = IComment;

export const Comment = (props: CommentProps) => {
	const { userId, messages } = props;
	const commentAuthor = USERS.find(user => user.id === userId);
	const isMainComment = commentAuthor?.id === CURRENT_USER_ID;
	const authorName = useMemo(() => {
		return commentAuthor?.name ?? 'UNKNOWN';
	}, []);

	const mods = {
		[s.currentUserComment]: isMainComment
	};

	return (
		<Spacer direction="column" className={s.commentsWrapper}>
			{messages.map(({ id, text }, i) => (
				<Spacer direction="column" align="start" key={id} className={classNames(s.comment, mods)}>
					{i === 0 && <span className={s.author}>{authorName}</span>}
					<span className={s.text}>{text}</span>
					{!isMainComment && <SmileMenu />}
				</Spacer>
			))}
		</Spacer>
	);
};

import { useMemo } from 'react';
import classNames from 'classnames';
import s from './Comment.module.scss';
import { IComment } from '@models/types/topics';
import { CURRENT_USER_ID, USERS } from '../../lib/constants';
import { SmileMenu } from '../SmileMenu/SmileMenu';

type CommentProps = IComment;

export const Comment = (props: CommentProps) => {
	const { userId, messages } = props;
	const commentAuthor = USERS.find(user => user.id === userId);
	const isMainComment = commentAuthor?.id === CURRENT_USER_ID;
	const authorName = useMemo(() => {
		return commentAuthor?.name ?? 'UNKNOWN';
	}, []);

	const mods = {
		[s.CurrentUserComment]: isMainComment,
	};

	return (
		<div className={s.CommentsWrapper}>
			{messages.map(({ id, text }, i) => (
				<div key={id} className={classNames(s.Comment, mods)}>
					{i === 0 && <span className={s.Author}>{authorName}</span>}
					<span className={s.Text}>{text}</span>
					{!isMainComment && <SmileMenu />}
				</div>
			))}
		</div>
	);
};

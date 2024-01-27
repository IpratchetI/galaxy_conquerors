import { useMemo } from 'react';
import classNames from 'classnames';
import { CommentModel } from '@models/topics';

import { Spacer } from '@/components';

import s from './index.module.scss';

import { CURRENT_USER_ID } from '../../lib/constants';
import { USERS } from '../../lib/mocks';
import { SmileMenu } from '../SmileMenu';

type CommentProps = CommentModel;

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

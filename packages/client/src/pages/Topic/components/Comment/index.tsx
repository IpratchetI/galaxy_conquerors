import classNames from 'classnames';
import { Reactions } from '@pages/Topic/components/Reactions';

import { Spacer } from '@/components';
import { useAppSelector, userState } from '@/store/selectors';

import s from './index.module.scss';

import { CommentDto } from 'server/forum/comment/types';

type CommentProps = {
	comment: CommentDto;
};

export const Comment = (props: CommentProps) => {
	const { user } = useAppSelector(userState);
	const { comment } = props;

	const isMainComment = comment.userId === user?.id;

	const mods = {
		[s.currentUserComment]: isMainComment
	};

	return (
		<Spacer direction="column" className={s.commentsWrapper}>
			<Spacer direction="column" align="start" className={classNames(s.comment, mods)}>
				<span className={s.author}>{comment?.author?.first_name}</span>
				<span className={s.text}>{comment.content}</span>

				{/* TODO: https://linear.app/galaxyconquerors/issue/GAL-60/dorabotki-po-api-foruma */}
				{/*{!isMainComment && <SmileMenu messageId={id} />}*/}
				{/*{reactions && <Reactions reactions={reactions} />}*/}
			</Spacer>
		</Spacer>
	);
};

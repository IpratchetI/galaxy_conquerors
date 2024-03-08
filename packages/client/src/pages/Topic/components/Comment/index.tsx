import classNames from 'classnames';
import { CommentModel } from '@models/topics';
import { Reactions } from '@pages/Topic/components/Reactions';

import { Spacer } from '@/components';

import s from './index.module.scss';

import { SmileMenu } from '../SmileMenu';
import { useAppSelector, userState } from '@/store/selectors';

type CommentProps = CommentModel & { authorName: string };

export const Comment = (props: CommentProps) => {
	const { user } = useAppSelector(userState);
	const { userId, messages, authorName } = props;

	const isMainComment = userId === user?.id;

	const mods = {
		[s.currentUserComment]: isMainComment
	};

	return (
		<Spacer direction="column" className={s.commentsWrapper}>
			{messages.map(({ id, text, reactions }, i) => (
				<Spacer direction="column" align="start" key={id} className={classNames(s.comment, mods)}>
					{i === 0 && <span className={s.author}>{authorName}</span>}
					<span className={s.text}>{text}</span>
					{!isMainComment && <SmileMenu />}
					{reactions && <Reactions reactions={reactions} />}
				</Spacer>
			))}
		</Spacer>
	);
};

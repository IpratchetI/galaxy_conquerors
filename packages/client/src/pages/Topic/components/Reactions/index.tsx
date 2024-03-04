import { Spacer } from '@components/Spacer';

import styles from './index.module.scss';

interface IReactionProps {
	reactions: Record<string, number>;
}

export const Reactions = (props: IReactionProps) => {
	return !Object.keys(props.reactions).length ? null : (
		<Spacer gap="12" className={styles.reactions}>
			{Object.entries(props.reactions).map(([reaction, count]) => (
				<Spacer key={reaction} className={styles.reaction}>
					<div className={styles.reactionEmoji}>{reaction}</div>
					<span className={styles.reactionCount} key={reaction}>
						{count}
					</span>
				</Spacer>
			))}
		</Spacer>
	);
};

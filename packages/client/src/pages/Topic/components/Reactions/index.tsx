import { Spacer } from '@components/Spacer';

import styles from './index.module.scss';

interface IReactionProps {
	reactions: Record<string, number>;
}

export const Reactions = (props: IReactionProps) => {
	if (!Object.keys(props.reactions).length) {
		return null;
	}
	return (
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

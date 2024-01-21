import { PropsWithChildren, ReactElement } from 'react';
import { Spacer } from '@components/Spacer';
import { Text } from '@components/Text';

import { classnames } from '@/utils/classnames';

import styles from './index.module.scss';

interface IFormCardProps extends PropsWithChildren {
	text?: string;
	footer: ReactElement;
	className?: string;
	fullWidthContent?: boolean;
	fullWidthFooter?: boolean;
}

export const FormCard = (props: IFormCardProps) => {
	const { text, fullWidthContent, fullWidthFooter, footer, children, className } = props;

	const contentMods = {
		[styles.fullWidth]: fullWidthContent
	};

	const footerMods = {
		[styles.fullWidth]: fullWidthFooter
	};

	return (
		<section className={classnames(styles.formCard, {}, [className])}>
			{text && <Text className={styles.text}>{text}</Text>}
			<div className={classnames(styles.content, contentMods)}>{children}</div>
			<Spacer className={classnames('', footerMods)}>{footer}</Spacer>
		</section>
	);
};

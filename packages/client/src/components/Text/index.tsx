import { memo, createElement } from 'react'
import { classnames } from '../../utils/classnames'
import { parseBRTagFromText } from './utils/parseBRTagFromText'
import styles from './index.module.scss'

type TextVariant = 'normal' | 'selected' | 'focus'

type TextAlign = 'left' | 'center' | 'right'

type TextSize = 's' | 'm' | 'l' | 'xl' | 'xxl'

interface TextProps {
	className?: string
	text: string
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
	variant?: TextVariant
	align?: TextAlign
	size?: TextSize
	strokeWidth?: string
}

export const Text = memo((props: TextProps) => {
	const {
		className,
		text,
		tag = 'p',
		variant = 'normal',
		align = 'left',
		size = 'm'
	} = props

	return createElement(
		tag as string,
		{
			className: classnames(styles.text, {}, [
				className,
				styles[variant],
				styles[align],
				styles[size]
			])
		},
		parseBRTagFromText(text)
	)
})

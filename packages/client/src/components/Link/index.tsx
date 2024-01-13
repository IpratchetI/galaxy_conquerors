import React, { ForwardedRef, forwardRef, HTMLAttributes, Ref } from 'react'
import styles from './index.module.scss'

type Props = {
	path: string
	children: JSX.Element
	linkType?: 'button' | 'link'
} & HTMLAttributes<HTMLDivElement | HTMLButtonElement>

export const Link = forwardRef(
	(
		props: Props,
		ref: ForwardedRef<HTMLDivElement | HTMLButtonElement | null>
	) => {
		const { path, children, linkType } = props

		if (linkType === 'button') {
			return (
				<button
					{...props}
					ref={ref as Ref<HTMLButtonElement>}
					className={styles.link}>
					{children}
				</button>
			)
		}

		// TODO: добавить компонент Link из react-router-dom после подключения роутера, пока кидает ошибку
		return (
			<div
				{...props}
				ref={ref as Ref<HTMLDivElement>}
				className={styles.link}>
				{children}
			</div>
		)
	}
)

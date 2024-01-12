import React, { HTMLAttributes } from 'react'
import styles from './index.module.scss'

type Props = {
	path: string
	children: JSX.Element
} & HTMLAttributes<HTMLDivElement>

export const Link = ({ path, children, onMouseEnter, onClick }: Props) => {
	// TODO: добавить компонент Link из react-router-dom после подключения роутера, пока кидает ошибку
	return (
		<div
			className={styles.link}
			onMouseEnter={onMouseEnter}
			onClick={onClick}>
			{children}
		</div>
	)
}

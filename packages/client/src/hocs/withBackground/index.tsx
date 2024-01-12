import React, { Component, ComponentType } from 'react'
import { classnames } from '../../utils/classnames'
import styles from './index.module.scss'

type BackgroundName = 'main'

export const withBackground =
	<T extends object>(
		Component: ComponentType<T>,
		backgroundName: BackgroundName
	) =>
	(props: T) =>
		(
			<main
				className={classnames(styles.background, {}, [
					styles[backgroundName]
				])}>
				<Component {...props} />
			</main>
		)

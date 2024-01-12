import React, { memo, useCallback, useState } from 'react'
import { Link, Text } from '../../../../components'
import styles from './index.module.scss'

type NavLink = {
	id: number
	text: string
	path: string
	type: 'button' | 'link'
}

const navLinks: NavLink[] = [
	// TODO: заменить path, когда будут готовы
	{ id: 0, type: 'link', path: '/game', text: 'Play' },
	{ id: 1, type: 'link', path: '/highscore', text: 'Highscore' },
	{ id: 2, type: 'link', path: '/authors', text: 'Authors' },
	{ id: 3, type: 'link', path: '/forum', text: 'Forum' },
	{ id: 4, type: 'button', path: '/sign-in', text: 'Exit' }
]

export const LinksList = memo(() => {
	const [activeLinkId, setActiveLinkId] = useState<number | null>(0)

	const onExit = useCallback(() => {
		// TODO: обработка выхода, когда будет готова ручка
	}, [])

	const renderNavLinks = useCallback(
		(data: NavLink[]) => {
			return data.map(({ id, path, text, type }) => {
				return (
					<li key={id}>
						<Link
							path={path}
							onMouseEnter={() => setActiveLinkId(id)}
							onClick={type === 'button' ? onExit : undefined}>
							<Text
								size="l"
								text={text}
								variant={
									id === activeLinkId ? 'selected' : 'normal'
								}
							/>
						</Link>
					</li>
				)
			})
		},
		[activeLinkId]
	)

	return <ul className={styles.list}>{renderNavLinks(navLinks)}</ul>
})

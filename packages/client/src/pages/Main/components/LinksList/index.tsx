import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
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
	const [activeLinkId, setActiveLinkId] = useState<number>(0)
	const activeLinkRef = useRef(null)

	const onExit = useCallback(() => {
		// TODO: обработка выхода, когда будет готова ручка
		console.log('exit')
	}, [])

	const handleKeyDown = useCallback((event: KeyboardEvent) => {
		event.preventDefault()

		switch (event.key) {
			case 'ArrowUp':
				setActiveLinkId(previousId => {
					if (previousId === null || previousId === 0)
						return navLinks.length - 1
					return previousId - 1
				})
				break

			case 'ArrowDown':
				setActiveLinkId(previousId => {
					if (
						previousId === null ||
						previousId === navLinks.length - 1
					)
						return 0
					return previousId + 1
				})
				break

			case 'Enter':
				if (activeLinkRef.current) {
					;(activeLinkRef.current as HTMLButtonElement).click()
				}
				break

			default:
				return
		}
	}, [])

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleKeyDown])

	const renderNavLinks = useCallback(
		(data: NavLink[]) => {
			return data.map(({ id, path, text, type }, index) => {
				const isActive = id === activeLinkId

				return (
					<li key={id}>
						<Link
							ref={isActive ? activeLinkRef : null}
							path={path}
							linkType={type}
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
		[activeLinkId, onExit]
	)

	return <ul className={styles.list}>{renderNavLinks(navLinks)}</ul>
})

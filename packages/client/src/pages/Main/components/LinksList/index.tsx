import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, Text } from '@/components'
import { navLinks } from './constants'
import styles from './index.module.scss'

export const LinksList = () => {
	const [activeLinkId, setActiveLinkId] = useState<number>(0)
	const activeLinkRef = useRef(null)

	const onExit = useCallback(() => {
		// TODO: обработка выхода, когда будет готова ручка
		console.log('exit')
	}, [])

	const handleKeyDown = (event: KeyboardEvent) => {
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
	}

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleKeyDown])

	return (
		<ul className={styles.list}>
			{navLinks.map(({ id, path, text, action }) => {
				const isActive = id === activeLinkId

				return (
					<li key={id}>
						<Link
							ref={isActive ? activeLinkRef : null}
							path={path}
							onMouseEnter={() => setActiveLinkId(id)}
							onClick={action ? onExit : undefined}>
							<Text
								size="l"
								variant={
									id === activeLinkId ? 'selected' : 'normal'
								}>
								{text}
							</Text>
						</Link>
					</li>
				)
			})}
		</ul>
	)
}

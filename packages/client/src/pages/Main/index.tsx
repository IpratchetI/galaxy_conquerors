import React, { memo } from 'react'
import { Spacer, Text } from '../../components'
import { withBackground } from '../../hocs/withBackground'
import { LinksList } from './components/LinksList'
import styles from './index.module.scss'

const Main = memo(() => (
	<Spacer className={styles.page} direction="column" fullHeight gap="80">
		<Text
			tag="h1"
			className={styles.title}
			size="xxl"
			align="center"
			text="Galaxy <br /> Conquerors"
		/>
		<nav>
			<LinksList />
		</nav>
	</Spacer>
))

export default withBackground(Main, 'main')

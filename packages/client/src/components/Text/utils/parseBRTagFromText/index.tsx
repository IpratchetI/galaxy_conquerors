import { Fragment } from 'react'

export const parseBRTagFromText = (text: string) => {
	if (text.indexOf('<br />') === -1) {
		return text
	}

	const splittedText = text.split('<br />')

	return (
		<>
			{splittedText.map((partOfText, index) => {
				if (index === splittedText.length - 1) {
					return partOfText
				}

				return (
					<Fragment key={index}>
						{partOfText.trim()}
						<br />
					</Fragment>
				)
			})}
		</>
	)
}

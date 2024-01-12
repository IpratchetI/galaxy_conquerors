import React, { ButtonHTMLAttributes } from 'react'

type Props = {
	children: JSX.Element
} & ButtonHTMLAttributes<HTMLButtonElement>

// TODO: компонент кнопки
export const Button = (props: Props) => {
	const { children, onClick } = props

	return (
		<button type="button" onClick={onClick}>
			{children}
		</button>
	)
}

import React, { ButtonHTMLAttributes } from 'react'

type Props = {
	// TODO: пропсы кнопки
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

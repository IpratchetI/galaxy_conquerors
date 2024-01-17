import React, { ButtonHTMLAttributes } from 'react'

type Props = {
	// TODO: пропсы кнопки
} & ButtonHTMLAttributes<HTMLButtonElement>

// TODO: компонент кнопки
export const Button = (props: Props) => {
	const { children, onClick, className } = props

	return (
		<button className={className} type="button" onClick={onClick}>
			{children}
		</button>
	)
}

/* eslint-disable react-refresh/only-export-components */
import { ButtonHTMLAttributes, FC } from 'react'

import cls from './Button.module.scss'
import { classNames } from '../../../libs/classNames/classNames'

export enum ButtonTheme {
  CLEAR = 'clear',
  FILLED = 'filled',
}

export enum ButtonSize {
  SMALL = 'small',
  MIDDLE = 'middle',
  LARGE = 'large',
  STRETCHED = 'stretched',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
  size?: ButtonSize
}

export const Button: FC<ButtonProps> = props => {
  const {
    className,
    children,
    theme = ButtonTheme.FILLED,
    size = ButtonSize.MIDDLE,
    ...otherProps
  } = props

  return (
    <button
      className={classNames(cls.Button, {}, [className ? className : '', cls[theme], cls[size]])}
      {...otherProps}
    >
      {children}
    </button>
  )
}

/* eslint-disable react-refresh/only-export-components */
import { ButtonHTMLAttributes, FC } from 'react'

import cls from './Button.module.scss'
import { classNames } from '../../../libs/classNames/classNames'


export enum ButtonSize {
  SMALL = 'small',
  MIDDLE = 'middle',
  LARGE = 'large',
  STRETCHED = 'stretched',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  mode?: "delete" | "create" | "rename" | "cancel"
  size?: ButtonSize
}

export const Button: FC<ButtonProps> = props => {
  const {
    className,
    children,
    mode = "cancel",
    size = ButtonSize.MIDDLE,
    ...otherProps
  } = props

  return (
    <button
      className={classNames(cls.Button, {}, [className ? className : '', cls[mode], cls[size]])}
      {...otherProps}
    >
      {children}
    </button>
  )
}

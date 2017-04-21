import React from 'react'

import styles from './Button.scss'

const Button = ({ children, type = 'normal', className = '', onClick = null }) => {
  return (
    <span
      className={`${styles['button']} ${styles[type]} ${className}`}
      onClick={onClick}>
      {children}
      </span>
  )
}

export default Button
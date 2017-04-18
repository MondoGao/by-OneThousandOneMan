import React from 'react'

import styles from './Button.scss'

const Button = ({ children, type = 'normal', className = '' }) => {
  return (
    <span className={`${styles['button']} ${styles[type]} ${className}`}>{children}</span>
  )
}

export default Button
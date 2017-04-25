import React from 'react'

import styles from './Button.scss'
import settings from 'sources/settings'

const Button = ({ children, type = 'normal', className = '', onClick = null }) => {
  return (
    <span
      className={`${styles['button']} ${styles[type]} ${className}`}
      onClick={onClick}>
      {children}
      {type === 'normal' ? <a className={styles['cheat-link']} href={settings.wechatHref}/> : null}
      </span>
  )
}

export default Button
import React from 'react'

import styles from './Button.scss'
import { settings } from 'sources'

const Button = ({ children, type = 'normal', className = '', onClick = null, onCheatClick = null }) => {
  return (
    <span className={`${styles['button']} ${styles[type]} ${className}`}>
      <span className={styles['text']} onClick={onClick}>
        {children}
      </span>
      {type === 'normal' ?
        <a
          className={styles['cheat-link']}
          href={settings.wechatHref}
          onClick={onCheatClick}/>
        : null}
      </span>
  )
}

export default Button
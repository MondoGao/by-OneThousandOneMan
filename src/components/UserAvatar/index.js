import React from 'react'

import styles from './UserAvatar.scss'

const UserAvatar = ({ src = '#', bordered = false, className = '' }) => {
  return (
    <span className={`${styles['avatar-wrapper']} ${bordered ? styles['bordered'] : ''} ${className}`}>
      <div className={styles['avatar']}>
        <img src={src} alt="Avatar"/>
      </div>
      {bordered ? <span className={styles['border-wrapper']}/> : null}
    </span>
  )
}

export default UserAvatar
import React from 'react'

import styles from './UserAvatar.scss'

class UserAvatar extends React.Component{
  render() {
    return (
      <span className={`${styles['avatar-wrapper']} ${this.props.bordered ? styles['bordered'] : ''} ${this.props.className}`}>
      <div className={styles['avatar']}>
        <img className={styles[`blur-${this.props.blurLevel}`]} src={this.props.src} alt="Avatar"/>
      </div>
        {this.props.bordered ? <span className={styles['border-wrapper']}/> : null}
    </span>
    )
  }
}

UserAvatar.defaultProps = {
  src: '#',
  bordered: false,
  className: '',
  blurLevel: 0
}

export default UserAvatar
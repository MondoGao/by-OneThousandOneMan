import React from 'react'
import PhotoMosaic from 'scripts/photomosaic'

import styles from './UserAvatar.scss'

class UserAvatar extends React.Component {
  handleImgLoad = (e) => {
    new PhotoMosaic({
      image        : e.target,
      targetElement: this.avatarDiv,
      width        : e.target.clientWidth,
      height       : e.target.clientHeight,
      tileHeight   : 7,
      tileWidth    : 7,
      tileShape    : 'rectangle',
      opacity      : 1,
      defaultBackground: '#fffbcb'
    })
  }
  
  render() {
    return (
      <span className={`${styles['avatar-wrapper']} ${this.props.bordered ? styles['bordered'] : ''} ${this.props.className}`}>
      <div className={styles['avatar']} ref={el => this.avatarDiv = el}>
        <img className={styles[`blur-${this.props.blurLevel}`]} src={this.props.src} alt="Avatar" onLoad={this.handleImgLoad}/>
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
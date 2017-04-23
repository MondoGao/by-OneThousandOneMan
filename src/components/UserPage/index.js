import React from 'react'
import { Link } from 'react-router-dom'

import styles from './UserPage.scss'

import LabelWall from 'components/LabelWall'
import Button from 'components/Button'
import RecentVisitor from 'components/RecentVisitor'
import UserAvatar from 'components/UserAvatar'
import LabelInput from 'components/LabelInput'
import { CSSTransitionFirstChild } from 'components/FirstChild'

class UserPage extends React.Component {
  render() {
    if (!this.props.user) {
      return null
    }
    
    let isMyself = this.props.myself.id === this.props.user.id
  
    const transitionSettings = {
      transitionAppear: true,
      transitionAppearTimeout: 1000,
      transitionEnter: false,
      transitionLeave: false
    }
  
    return (
      <div className={styles['user-page']} style={this.props.style}>
        <CSSTransitionFirstChild
          {...transitionSettings}
          transitionName={{
            appear: 'bounceInDown',
            appearActive: 'animated'
          }}>
          <section>
            <UserAvatar className={styles['avatar']} src={this.props.user.avatar} bordered/>
            <LabelWall labels={this.props.user.labels}/>
          </section>
        </CSSTransitionFirstChild>
        <CSSTransitionFirstChild
          {...transitionSettings}
          transitionName={{
            appear: 'zoomIn',
            appearActive: 'animated'
          }}>
          <section>
            {isMyself ?
              <Button className={styles['btn-myself']}>呼朋唤友求标签</Button> :
              [
                <LabelInput key="input"/>,
                <Button key="btn" className={styles['btn-other']}>
                  <Link to={`/`}>我也要建标签墙</Link>
                </Button>
              ]
            }
            <RecentVisitor visitorAvatarSrcs={this.props.user.visitorAvatars} visitorNum={this.props.user.visitorNum}/>
          </section>
        </CSSTransitionFirstChild>
      </div>
    )
  }
}

UserPage.defaultProps = {
  user: {},
  myself:{}
}

export default UserPage
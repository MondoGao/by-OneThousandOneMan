import React from 'react'

import styles from './UserPage.scss'

import LabelWall from 'components/LabelWall'
import Button from 'components/Button'
import RecentVisitor from 'components/RecentVisitor'
import UserAvatar from 'components/UserAvatar'
import LabelInput from 'components/LabelInput'
import { CSSTransitionFirstChild } from 'components/FirstChild'

class UserPage extends React.Component {
  render() {
    let isMyself = false
  
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
            <UserAvatar className={styles['avatar']} bordered/>
            <LabelWall/>
          </section>
        </CSSTransitionFirstChild>
        <CSSTransitionFirstChild
          {...transitionSettings}
          transitionName={{
            appear: 'bounceInUp',
            appearActive: 'animated'
          }}>
          <section>
            {isMyself ?
              <Button className={styles['btn-myself']}>呼朋唤友求标签</Button> :
              [
                <LabelInput key="input"/>,
                <Button key="btn" className={styles['btn-other']}>我也要建标签墙</Button>
              ]
            }
            <RecentVisitor/>
          </section>
        </CSSTransitionFirstChild>
      </div>
    )
  }
}

export default UserPage
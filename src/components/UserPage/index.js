import React from 'react'

import styles from './UserPage.scss'

import LabelWall from 'components/LabelWall'
import Button from 'components/Button'
import RecentVisitor from 'components/RecentVisitor'
import UserAvatar from 'components/UserAvatar'
import LabelInput from 'components/LabelInput'

class UserPage extends React.Component {
  render() {
    let isMyself = false
    
    return (
      <div className={styles['user-page']} style={this.props.style}>
        <UserAvatar className={styles['avatar']} bordered/>
        <LabelWall/>
        {isMyself ?
          <Button className={styles['btn-myself']}>呼朋唤友求标签</Button> :
          [
            <LabelInput key="input"/>,
            <Button key="btn" className={styles['btn-other']}>我也要建标签墙</Button>
          ]
        }
        <RecentVisitor/>
      </div>
    )
  }
}

export default UserPage
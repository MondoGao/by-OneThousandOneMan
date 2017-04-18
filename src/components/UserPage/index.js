import React from 'react'

import styles from './UserPage.scss'

import LabelWall from 'components/LabelWall'
import Button from 'components/Button'
import RecentVisitor from 'components/RecentVisitor'
import UserAvatar from 'components/UserAvatar'

class UserPage extends React.Component {
  render() {
    return (
      <div className={styles['user-page']}>
        <UserAvatar className={styles['avatar']} bordered/>
        <LabelWall/>
        <Button className={styles['button']}>呼朋唤友求标签</Button>
        <RecentVisitor/>
      </div>
    )
  }
}

export default UserPage
import React from 'react'

import styles from './UserPage.scss'

import LabelWall from 'components/LabelWall'
import Button from 'components/Button'

class UserPage extends React.Component {
  render() {
    return (
      <div className={styles['user-page']}>
        <LabelWall/>
        <Button>呼朋唤友求标签</Button>
      </div>
    )
  }
}

export default UserPage
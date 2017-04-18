import React from 'react'

import styles from './UserPage.scss'

class UserPage extends React.Component {
  render() {
    return (
      <div>
        <LabelWall/>
      </div>
    )
  }
}

class LabelWall extends React.Component {
  render() {
    const hasLabel = this.props.labelIds.length > 0
  
    return (
      <div className={styles['wall-container']}>
        <div className={`${styles['wall-content']} ${hasLabel ? '' : styles['empty']}`}>
      
        </div>
      </div>
    )
  }
}

LabelWall.defaultProps = {
  labelIds: []
}

export default UserPage
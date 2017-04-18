import React from 'react'

import styles from './RecentVisitor.scss'

import TitleOrnament from 'components/TitleOrnament'

const RecentVisitor = ({ visitorIds = [] }) => {
  const hasVisitor = visitorIds.length > 0
  let visitorAvatars = []
  
  return (
    <div className={`${styles['recent-visitor']} ${hasVisitor ? '' : styles['empty']}`}>
      <h4>
        <TitleOrnament/>
        <span className={styles['header-text']}>最近访客</span>
        <TitleOrnament isReversed/>
      </h4>
      {visitorAvatars}
      <span className={styles['empty-tip']}>呜呜呜！暂无访客</span>
    </div>
  )
}

export default RecentVisitor
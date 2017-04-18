import React from 'react'

import styles from './RecentVisitor.scss'

import TitleOrnament from 'components/TitleOrnament'
import UserAvatar from 'components/UserAvatar'

const RecentVisitor = ({ visitorAvatarSrcs = [require('assets/airship@2x.png')] }) => {
  const hasVisitor = visitorAvatarSrcs.length > 0
  const visitorAvatars = visitorAvatarSrcs.map(src => (
    <UserAvatar src={src}/>
  ))
  
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
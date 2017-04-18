import React from 'react'

import styles from './RecentVisitor.scss'

import TitleOrnament from 'components/TitleOrnament'
import UserAvatar from 'components/UserAvatar'

const RecentVisitor = ({ visitorAvatarSrcs = [require('assets/airship@2x.png'), require('assets/airship@2x.png'),require('assets/airship@2x.png'),require('assets/airship@2x.png'),require('assets/airship@2x.png'),require('assets/airship@2x.png')] }) => {
  const hasVisitor = visitorAvatarSrcs.length > 0
  const visitorAvatars = visitorAvatarSrcs.map(src => (
    <UserAvatar className={styles['avatar']} src={src} blurLevel={6 - visitorAvatarSrcs.length}/>
  ))
  
  return (
    <div className={`${styles['recent-visitor']}`}>
      <h4>
        <TitleOrnament/>
        <span className={styles['header-text']}>最近访客</span>
        <TitleOrnament isReversed/>
      </h4>
      <div className={styles['avatar-list']}>
        {visitorAvatars}
      </div>
      {hasVisitor ?
        <span className={styles['blur-tip']}>来访的朋友越多 访客头像越清晰</span> :
      <span className={styles['empty-tip']}>呜呜呜！暂无访客</span>}
    </div>
  )
}

export default RecentVisitor
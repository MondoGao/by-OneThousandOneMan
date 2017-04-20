import React from 'react'

import styles from './LabelInput.scss'

const LabelInput = () => {
  return (
    <div className={styles['label-input-container']}>
      <p className={styles['alter-label-container']}>
        <AlternativeLabel>家穷人丑</AlternativeLabel>
        <AlternativeLabel>要求太高</AlternativeLabel>
        <AlternativeLabel>没有选择我</AlternativeLabel>
        <AlternativeLabel>高冷</AlternativeLabel>
      </p>
    </div>
  )
}

const AlternativeLabel = ({ animationDelay, children }) => {
  return (
    <span className={styles['alter-label']}>
      {children}
    </span>
  )
}

export default LabelInput
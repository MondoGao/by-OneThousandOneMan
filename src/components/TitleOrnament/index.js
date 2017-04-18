import React from 'react'

import styles from './TitleOrnament.scss'

const TitleOrnament = ({ isReversed = false }) => {
  return (
    <span className={`${styles['title-ornament']} ${isReversed ? styles['reversed'] : ''}`}/>
  )
}

export default TitleOrnament
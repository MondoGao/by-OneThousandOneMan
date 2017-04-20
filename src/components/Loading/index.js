import React from 'react'

import styles from './Loading.scss'
import hand from 'assets/gesture@2x.png'

const Loading = () => {
  return (
    <div className={styles['loading']}>
      <section className={styles['heart-wrapper']}>
        <FloatHeart animationDelay={100}/>
        <FloatHeart animationDelay={750}/>
        <FloatHeart animationDelay={400}/>
      </section>
      <section>
        <img
          src={hand}
          alt="华科脱单"
          className={styles['hand']}/>
        <p className={styles['tip']}>
          「华科脱单」玩命加载中...
        </p>
      </section>
    </div>
  )
}

const FloatHeart = ({ animationDelay = 0 }) => {
  return (
    <span
      className={styles['float-heart']}
      style={{animationDelay: animationDelay + 'ms'}}/>
  )
}

export default Loading
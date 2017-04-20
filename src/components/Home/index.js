import React from 'react'

import styles from './Home.scss'

import Button from 'components/Button'
import TitleOrnament from 'components/TitleOrnament'

const Title = () => {
  const textArr = ['yi', 'qian', 'ge', 'dan', 'shen', 'li', 'you']
  const texts = textArr.map(text => <span
    key={text}
    className={`${styles['text']} ${styles[`text-${text}`]}`}/>)
  
  return (
    <div className={styles['home']}>
      <section className={styles['text-container']}>
        {texts}
        <span className={styles['top-tip']}/>
        <span className={styles['bottom-tip']}/>
      </section>
      <section className={styles['button-container']}>
        <h4>
          <TitleOrnament/>
          <Button
            className={styles['btn']}
            type="flatten">生成标签墙</Button>
          <TitleOrnament isReversed/>
        </h4>
        <p>让朋友告诉我单身的原因</p>
      </section>
    </div>
  )
}

export default Title
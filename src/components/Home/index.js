import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Home.scss'
import { settings } from 'sources'

import Button from 'components/Button'
import TitleOrnament from 'components/TitleOrnament'
import { CSSTransitionFirstChild } from 'components/FirstChild'

const Home = ({ style = {}, myself = {}, createWall }) => {
  const transitionSettings = {
    transitionAppear: true,
    transitionAppearTimeout: 1600,
    transitionEnter: false,
    transitionLeave: false,
    style: {
      animationDelay: '400ms'
    }
  }
  const animationNames = ['bounceInDown', 'bounceInDown', 'bounceInLeft', 'bounceInLeft', 'bounceInRight', 'bounceInRight', 'bounceInRight', 'bounceIn', 'bounceIn']
  
  const textArr = ['yi', 'qian', 'ge', 'dan', 'shen', 'li', 'you', 'top-tip', 'bottom-tip']
  const texts = textArr.map((text, index) => {
    const transitionNameSetting = {
      transitionName: {
        appear: animationNames[index],
        appearActive: 'animated'
      }
    }
    
    return (
      <CSSTransitionFirstChild
        {...transitionSettings}
        {...transitionNameSetting}
        key={text}>
        <span
          className={`${styles['text']} ${styles[`text-${text}`]}`}
          style={transitionSettings.style}/>
      </CSSTransitionFirstChild>)
  })
  
  return (
    <div className={styles['home']} style={style}>
      <section className={styles['text-container']}>
        {texts}
      </section>
      <CSSTransitionFirstChild
        {...transitionSettings}
        transitionName={{
          appear: 'fadeInUp',
          appearActive: 'animated'
        }}>
        <section
          className={styles['button-container']}
          style={{
            animationDelay: '600ms'
          }}>
          <h4>
            <TitleOrnament/>
            <Button
              className={styles['btn']}
              type="flatten"
            >
              <Link
                to={`${settings.publicPath}users/${myself.id}`}
                onClick={e => {
                  e.preventDefault()
                  
                  createWall(myself.id)
                    .then(() => {
                      window.location.href = `${window.location.origin}${settings.publicPath}users/${myself.id}`
                    })
                }}
              >
                {myself.hasWall ? '查看弹幕墙' : '生成弹幕墙'}
              </Link>
            </Button>
            <TitleOrnament isReversed/>
          </h4>
          <p>让朋友告诉我单身的原因</p>
        </section>
      </CSSTransitionFirstChild>
    </div>
  )
}

export default Home
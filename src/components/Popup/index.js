import React from 'react'

import styles from './Popup.scss'

import { CSSTransitionFirstChild } from 'components/FirstChild'

const Popup = ({children, onClose}) => {
  const transitionSettings = {
    transitionName: {
      appear: 'fadeIn',
      appearActive: 'animated',
      enter: 'fadeIn',
      enterActive: 'animated',
      leave: 'fadeOut',
      leaveActive: 'animated'
    },
    transitionAppear: true,
    transitionAppearTimeout: 400,
    transitionEnterTimeout: 400,
    transitionLeaveTimeout: 400,
    style: {
      animationDuration: '300ms'
    }
  }
  
  return (
    <div className={styles['popup-wrapper']}>
      <CSSTransitionFirstChild {...transitionSettings}>
        <div
          className={styles['popup']}
          style={transitionSettings.style}
          onClick={e => e.stopPropagation()}
        >
          <span
            className={styles['close']}
            onClick={onClose}
          />
          {children}
        </div>
      </CSSTransitionFirstChild>
    </div>
  )
}

export default Popup
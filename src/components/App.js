import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'
import 'normalize.css'
import './App.css'
import 'styles/transitions.css'
import 'styles/animations.css'

import styles from './App.scss'

import UserPage from 'components/UserPage'
import Loading from 'components/Loading'
import Home from 'components/Home'
import { CSSTransitionFirstChild } from 'components/FirstChild'
import TransitionRoute from 'components/TransitionRoute'

const App = ({location, isLoading = false}) => {
  const transitionSettings = {
    transitionName         : {
      appear      : 'fadeIn',
      appearActive: 'animated-500-ms',
      enter       : 'fadeIn',
      enterActive : 'animated-500-ms',
      leave       : 'fade-out-absolute',
      leaveActive : 'animated-500-ms'
    },
    transitionAppear       : true,
    transitionAppearTimeout: 500,
    transitionEnterTimeout : 500,
    transitionLeaveTimeout : 500,
  }
  
  return (
    <div>
      <CSSTransitionFirstChild {...transitionSettings}>
        {isLoading ? <Loading key="loading"/> : null}
      </CSSTransitionFirstChild>
      {isLoading ? null :
        <div>
          <TransitionRoute
            path="/users"
            key="/users"
            transitionChildren={<UserPage/>}
            {...transitionSettings}/>
          <TransitionRoute
            exact={true}
            path="/"
            key="/home"
            transitionChildren={<Home/>}
            {...transitionSettings}/>
        </div>}
      <p className="copyright">2017© Powered by Bingyan Studio</p>
    </div>
  )
}

export default App
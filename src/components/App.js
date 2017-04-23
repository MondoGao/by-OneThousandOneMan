import React from 'react'
import 'normalize.css'
import './App.css'
import 'styles/transitions.css'
import 'styles/animations.css'

import UserPageContainer from 'containers/UserPageContainer'
import Loading from 'components/Loading'
import HomeContainer from 'containers/HomeContainer'
import { CSSTransitionFirstChild } from 'components/FirstChild'
import TransitionRoute from 'components/TransitionRoute'

const App = ({ isLoading = true, loadingComplete }) => {
  const transitionSettings = {
    transitionName         : {
      appear      : 'fadeIn',
      appearActive: 'animated',
      enter       : 'fadeIn',
      enterActive : 'animated',
      leave       : 'fade-out-absolute',
      leaveActive : 'animated'
    },
    transitionAppear       : true,
    transitionAppearTimeout: 500,
    transitionEnterTimeout : 500,
    transitionLeaveTimeout : 500,
    style: {
      animationDuration: '500ms'
    }
  }
  
  return (
    <div>
      <CSSTransitionFirstChild {...transitionSettings}>
        {isLoading ? <Loading key="loading" loadingComplete={loadingComplete} style={transitionSettings.style}/> : null}
      </CSSTransitionFirstChild>
      {isLoading ? null :
        <div>
          <TransitionRoute
            path="/users/:id"
            key="/users"
            transitionChildren={UserPageContainer}
            {...transitionSettings}/>
          <TransitionRoute
            exact={true}
            path="/"
            key="/home"
            transitionChildren={HomeContainer}
            {...transitionSettings}/>
        </div>}
      <p className="copyright">2017© Powered by Bingyan Studio</p>
    </div>
  )
}

export default App
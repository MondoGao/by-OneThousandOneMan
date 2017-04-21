import React from 'react'
import { Route, Switch } from 'react-router-dom'
import 'normalize.css'
import './App.css'
import 'styles/transitions.css'
import 'styles/animations.css'

import UserPage from 'components/UserPage'
import Loading from 'components/Loading'
import Home from 'components/Home'
import { CSSTransitionFirstChild } from 'components/FirstChild'

const App = ({location, isLoading = true}) => {
  return (
    <div>
      <CSSTransitionFirstChild
        transitionName={{
          appear: 'fadeIn',
          appearActive: 'animated-500-ms',
          enter: 'fadeIn',
          enterActive: 'animated-500-ms',
          leave: 'fadeOut',
          leaveActive: 'animated-500-ms'
        }}
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
        {isLoading ? <Loading key="loading"/> : null}
      </CSSTransitionFirstChild>
      {isLoading ? null :
        <Switch>
          <Route
            location={location}
            path="/users"
            component={UserPage}/>
          <Route
            location={location}
            exact={true}
            path="/"
            component={Home}/>
        </Switch>}
      <p className="copyright">2017© Powered by Bingyan Studio</p>
    </div>
  )
}

export default App
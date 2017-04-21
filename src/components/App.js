import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'
import 'normalize.css'
import './App.css'
import 'styles/transitions.css'
import 'styles/animations.css'

import UserPage from 'components/UserPage'
import Loading from 'components/Loading'
import Home from 'components/Home'
import FirstChild from 'components/FirstChild'

const App = ({location, isLoading = false}) => {
  return (
    <div>
      <CSSTransitionGroup
        component={FirstChild}
        transitionName="fade"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
        {isLoading ? <Loading key="loading"/> : null}
      </CSSTransitionGroup>
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
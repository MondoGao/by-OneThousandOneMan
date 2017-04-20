import React from 'react'
import { Route } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'
import 'normalize.css'
import './App.css'

import UserPage from 'components/UserPage'
import Loading from 'components/Loading'
import Home from 'components/Home'

const App = ({location, isLoading = false}) => {
  return (
    <CSSTransitionGroup
      component="div"
      transitionName="fade"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}>
      {isLoading ?
        <Loading/> :
        <Route path="/" component={Home}/>}
      <p className="copyright">2017© Powered by Bingyan Studio</p>
    </CSSTransitionGroup>
  )
}

export default App
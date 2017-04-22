import React  from 'react'
import { Route } from 'react-router-dom'
import { CSSTransitionFirstChild } from 'components/FirstChild'

const TransitionRoute = (props) => {
  return (
    <Route
      {...props}
      children={({ match }) => (
        <CSSTransitionFirstChild {...props}>
          {match ? props.transitionChildren : null}
        </CSSTransitionFirstChild>
      )}/>
  )
}

export default TransitionRoute
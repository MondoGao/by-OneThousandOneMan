import React  from 'react'
import { Route } from 'react-router-dom'
import { CSSTransitionFirstChild } from 'components/FirstChild'

const TransitionRoute = props => (
  <Route
    {...props}
    children={({ match }) => {
      console.log(match)
      
      return (
        <CSSTransitionFirstChild {...props}>
          {match ? (
            props.exact ? (
              match.isExact ?
                props.transitionChildren : null) : props.transitionChildren) : null}
        </CSSTransitionFirstChild>
      )
    }}
  />
)

export default TransitionRoute
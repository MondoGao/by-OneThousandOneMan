import React  from 'react'
import { Route } from 'react-router-dom'
import { CSSTransitionFirstChild } from 'components/FirstChild'

const TransitionRoute = props => (
  <Route
    path={props.path}
    children={(route) => {
      const Child = props.transitionChildren
      const ChildNode = <Child style={props.style} {...route}/>
      
      return (
        <CSSTransitionFirstChild {...props}>
          {route.match ? (
            props.exact ? (
              route.match.isExact ?
                ChildNode : null) : ChildNode) : null}
        </CSSTransitionFirstChild>
      )
    }}
  />
)

export default TransitionRoute
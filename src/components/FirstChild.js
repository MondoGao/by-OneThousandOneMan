import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

const FirstChild = props => (React.Children.toArray(props.children)[0] || null)

export const CSSTransitionFirstChild = props => (
  <CSSTransitionGroup
    {...props}
    component={FirstChild}>
    {props.children}
  </CSSTransitionGroup>
)

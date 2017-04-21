import React from 'react'

const FirstChild = props => (React.Children.toArray(props.children)[0] || null)

export default FirstChild
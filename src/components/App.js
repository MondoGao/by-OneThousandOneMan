import React from 'react'
import { Route } from 'react-router-dom'
import 'normalize.css'
import './App.css'

import UserPage from 'components/UserPage'

const App = (props) => (
  <div>
    <Route path="/" component={UserPage}/>
  </div>
)

export default App
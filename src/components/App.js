import React from 'react'
import { Route } from 'react-router-dom'
import 'normalize.css'
import './App.css'

import UserPage from 'components/UserPage'
import Loading from 'components/Loading'

const App = ({location, isLoading = true}) => {
  if (isLoading) {
    return       <Loading/>
  }
  
  return (
    <div>
      <Route path="/" component={UserPage}/>
      <p className="copyright">2017© Powered by Bingyan Studio</p>
    </div>
  )
}

export default App
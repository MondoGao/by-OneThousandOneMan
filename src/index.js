import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { AppContainer } from 'react-hot-loader'

import reducers from 'reducers/index'

import App from 'containers/AppContainer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let middlewares = [
  thunk
]

if (process.env.NODE_ENV === 'develop') {
  middlewares.push(logger)
}

let store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(...middlewares)
  )
)

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        {Component}
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

render(
  <Router>
    <Route path="/" component={App}/>
  </Router>
);

if (module.hot) {
  module.hot.accept('components/App', () => {
    render(
      <Router>
        <Route path="/" component={App}/>
      </Router>
    )
  })
  module.hot.accept('containers/AppContainer', () => {
    render(
      <Router>
        <Route path="/" component={App}/>
      </Router>
    )
  })
}
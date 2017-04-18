import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { AppContainer } from 'react-hot-loader'

import reducers from 'reducers/index'

import App from 'components/App';

let middlewares = [
  thunk
]

if (process.env.NODE_ENV === 'develop') {
  middlewares.push(logger)
}

let store = createStore(
  reducers,
  applyMiddleware(...middlewares)
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
}
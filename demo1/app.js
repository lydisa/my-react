import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {browserHistory,Router, Route } from 'react-router'
import {createBrowserHistory } from 'history'
import todoApp from './reducers'
import App from './components/App'
let store = createStore(todoApp)
debugger;
render(
     <Provider store={store}>
    <Router history={new createBrowserHistory()}>
      <Route path="/(:filter)" component={App} />
    </Router>
  </Provider>,
    document.getElementById('app')
)
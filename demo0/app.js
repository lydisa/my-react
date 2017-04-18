import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import configureStore from './stores/appStroe'
import App from './containers/app'

let store = configureStore()

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
)

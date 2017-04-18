import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import appReducer from '../reducers/appReducer'
import app from '../middleware/app'

let creator = compose(applyMiddleware(thunk), applyMiddleware(app))(createStore)

export default function configureStore(initState) {
  const store = creator(appReducer, initState)
  return store
}

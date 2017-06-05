import React, { Component, PropTypes } from 'react'
import List from '../components/list'
import Button from '../components/button'


export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      'addListFunc': null
    }
  }

  render() {
    return (
      <div>
        <Button callAddListFunc={ this.callAddListFunc.bind(this) } />
        <List addListFunc={ this.setAddListFunc.bind(this) } />
      </div>
    )
  }

  setAddListFunc(func) {
    this.setState({
      'addListFunc': func
    })
  }

  callAddListFunc() {
    const { addListFunc } = this.state
    addListFunc()
  }
}

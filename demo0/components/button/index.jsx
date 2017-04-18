import React, { Component, PropTypes } from 'react'


export default class Button {
  static propTypes = {
    'callAddListFunc': PropTypes.func
  }

  static defaultTypes = {
    'callAddListFunc': ()=>{}
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { callAddListFunc } = this.props
    return (
      <button onClick={ callAddListFunc }>
        添加新项
      </button>
    )
  }
}

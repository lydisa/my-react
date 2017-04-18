import React, { Component, PropTypes } from 'react'


export default class List extends Component {
  static propTypes = {
    'setAddListFunc': PropTypes.func
  }
  static defaultProps = {
    'setAddListFunc': () => {}
  }

  constructor (props) {
    super(props)
    this.state = {
      list: []
    }
    const { setAddListFunc } = props
    setAddListFunc(this.addItem.bind(this))
  }

  render() {
    const { list } = this.state
    return (
      <ul>
        { list.map((item, index)=>{
          <li key={ `li_${index}` }>item</li>
        }) }
      </ul>
    )
  }

  addItem () {
    let { list } = this.state
    this.setState({
      'list': list.push('new item')
    })
  }

}

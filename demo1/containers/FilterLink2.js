import React from 'react'
import { Link } from 'react-router'

export default class FilterLink2 extends Component {
    render() {
        const { filter, children } = this.props
        return <Link to={filter==='all'?'':filter} activeStyle={{textDecoration:'none',color:'black'}}>
        {children}
        </Link>
    }
}

import React, { Component } from 'react'
import { Link } from 'react-router'

class CommonItem extends Component {
    render() {
        var id = this.props.params.id;
        return (
            <div>current {id}</div>
        )
    }
}

export default CommonItem

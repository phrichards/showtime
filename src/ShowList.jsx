import React, { Component } from 'react'

import {
    Button,
} from '@material-ui/core'

import ShowForm from './ShowForm'
import Shows from './Shows'

class ShowList extends Component {

    render() {
        return (
            <>
                <Shows shows={this.props.shows} updateShow={this.props.updateShow} deleteShow={this.props.deleteShow} />
                <Button href="/add" addNewShow={this.props.addNewShow}>Add a show</Button>
            </>
        )
    }
}

export default ShowList
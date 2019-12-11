import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import {
    Button,
} from '@material-ui/core'

import Shows from './Shows'

import { getToken, verifyToken } from './services/tokenService';

class ShowList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            shows: []
        }
    }

    componentDidMount() {
        this.props.fetchShows()
    }

    render() {
        return (
            <>
                <Shows shows={this.props.shows} updateShow={this.props.updateShow} deleteShow={this.props.deleteShow} />
                <Button href="/add" variant="contained" color="primary" addNewShow={this.props.addNewShow}>Add a show</Button>
            </>
        )
    }
}

export default withRouter(ShowList)
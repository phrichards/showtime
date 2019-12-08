import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import {
    Button,
} from '@material-ui/core'

import ShowForm from './ShowForm'
import Shows from './Shows'

import { getToken } from './services/tokenService';

class ShowList extends Component {

    componentDidMount() {
        if (!getToken()) {
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <>
                <h1>
                    {
                        getToken() 
                        ? 'Logged In'
                        : 'Not logged in'
                    }
                </h1>
                <Shows shows={this.props.shows} updateShow={this.props.updateShow} deleteShow={this.props.deleteShow} />
                <Button href="/add" variant="contained" color="primary" addNewShow={this.props.addNewShow}>Add a show</Button>
            </>
        )
    }
}

export default withRouter(ShowList)
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
        // if (!getToken()) {
        //     this.props.history.push('/login')
        // }

        console.log('show list props', this.props)
        this.props.fetchShows()
    }

    // fetchShows = async () => {
    //     console.log('fetch some shows')
    //     try {
    //         const token = getToken()
    //         const verified = verifyToken(token)
    //         console.log('verified', verified)
    //         const result = await fetch(`/api/shows/user/${verified.user.id}`)
    //         const data = await result.json()
    //         console.log('shows', data.data)
    //         const prevState = this.state
    //         const newState = { shows: data.data, token: token }
    //         const nextState = Object.assign({}, prevState, newState)
    //         this.setState(nextState)
    //     } catch (err) {
    //         throw err
    //     }
    // }

    

    // TODO: sort shows by date
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
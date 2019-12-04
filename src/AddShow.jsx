import React, { Component } from 'react'

import {
    Typography,
} from '@material-ui/core'

import ShowForm from './ShowForm'

class AddShow extends Component {

    render() {
        return (
            <Typography variant="body2" color="textSecondary" component="p">
                <h2>Add a show</h2>
                <ShowForm addNewShow={this.props.addNewShow} />
            </Typography>
        )
    }
}

export default AddShow
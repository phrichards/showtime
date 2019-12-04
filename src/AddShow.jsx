import React, { Component } from 'react'

import {
    Typography,
    Card,
    CardContent
} from '@material-ui/core'

import ShowForm from './ShowForm'

class AddShow extends Component {

    render() {
        return (
            <Card style={{ maxWidth: 600, margin: 10 }}>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <h2>Add a show</h2>
                        <ShowForm addNewShow={this.props.addNewShow} />
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default AddShow
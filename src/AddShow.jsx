import React, { Component } from 'react'

import {
    Typography,
    Card,
    CardContent,
    Grid
} from '@material-ui/core'

import ShowForm from './ShowForm'

class AddShow extends Component {

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <h2>Add a show</h2>
                                <ShowForm addNewShow={this.props.addNewShow} />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

export default AddShow
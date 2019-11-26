import React, { Component } from 'react'

import {
    Card,
    CardContent,
    Typography
} from '@material-ui/core'

import MoreVertIcon from '@material-ui/icons/MoreVert'

class Show extends Component {
    render() {
        const {
            _id,
            date,
            location,
            lineup
        } = this.props.data
        return (
            <Card style={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <div>
                            <p>Lineup</p>
                            <ul>
                            {lineup.map(artist => {
                                return <li>{artist}</li>
                            })}
                            </ul>
                            {location} - {date}
                        </div>
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default Show
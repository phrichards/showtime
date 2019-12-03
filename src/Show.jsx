import React, { Component } from 'react'

import {
    Card,
    CardContent,
    Typography,
    Button,
    TextField
} from '@material-ui/core'

import ShowForm from './ShowForm'

class Show extends Component {

    constructor(props) {
        super(props) 

        this.state = {
            showArtistInput: false,
            showSaveButton: false,
            toggleEditForm: false,
            _id: null,
            date: null,
            venue: null,
            artists: [],
        }
    }

    componentDidMount() {
        const {
            _id,
            date,
            venue,
            artists
        } = this.props.data

        this.setState({
            _id, 
            date,
            venue,
            artists,
        })
    }

    render() {
        return (
            <Card style={{ maxWidth: 345 }}>
                <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <div>
                                <p>Lineup</p>
                                <ul>
                                {this.state.artists.map(artist => {
                                    return this.state.showArtistInput 
                                        ? <TextField placeholder={artist} name="artist" />
                                        : <li>{artist}</li>
                                })}
                                </ul>
                                {this.state.venue} - {this.state.date}
                            </div>
                            <Button><a href={`/show/${this.state._id}`}>Detail</a></Button>
                        </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default Show
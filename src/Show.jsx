import React, { Component } from 'react'
import moment from 'moment';

import {
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    Grid
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
            <Card style={{ maxWidth: 600, margin: 10 }}>
                <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <div>
                                <h2>Lineup</h2>
                                <List>
                                {this.state.artists.map(artist => {
                                    return this.state.showArtistInput 
                                        ? <TextField label={artist} name="artist" />
                                        : <ListItem style={{ textAlign: 'center', margin: 0, padding: 0 }}>
                                            <ListItemText>{artist}</ListItemText>
                                        </ListItem>
                                })}
                                </List>
                                <h2>Location</h2>
                                <List>
                                    <ListItem style={{ textAlign: 'center', margin: 0, padding: 0 }}>
                                        <ListItemText>{this.state.venue}</ListItemText>
                                    </ListItem>
                                    <ListItem style={{ textAlign: 'center', margin: 0, padding: 0 }}>
                                    <ListItemText>{moment(this.state.date).format('lll')}</ListItemText>
                                    </ListItem>
                                </List>
                            </div>
                            <Button variant="contained" color="primary" href={`/show/${this.state._id}`}>Detail</Button>
                        </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default Show
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

        console.log('artists in show mount', artists)

        this.setState({
            _id, 
            date,
            venue,
            artists,
        })
    }

    toggleEditForm = () => {
        console.log('click')
        this.setState({
            // showArtistInput: true,
            // showSaveButton: true
            toggleEditForm: !this.state.toggleEditForm,
        })
    }

    updateShow = showData => {
        const {
            _id,
            date,
            venue,
            artists
        } = showData

        this.setState({
            _id,
            date,
            venue,
            artists,
        })
    }

    saveEditForm = () => {
        console.log('save')
    }

    render() {
        return (
            <Card style={{ maxWidth: 345 }}>
                <CardContent>
                    {this.state.toggleEditForm
                        ? <ShowForm type="update" updateShow={this.updateShow} toggleEditForm={this.toggleEditForm} handleVenueChange={this.handleVenueChange} showData={this.props.data} />
                        :
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

                            {this.state.showSaveButton
                                ? <Button onClick={this.saveEditForm}>Save</Button>
                                : <Button onClick={this.toggleEditForm}>Edit Show</Button>
                            }

                        </Typography>
                    }
                </CardContent>
            </Card>
        )
    }
}

export default Show
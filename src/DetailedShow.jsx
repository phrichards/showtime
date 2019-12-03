import React, { Component } from 'react'

import {
    Card,
    CardContent,
    Typography,
    Button,
    TextField
} from '@material-ui/core'

import ShowForm from './ShowForm'

class DetailedShow extends Component {

    constructor(props) {
        super(props) 

        this.state = {
            show: {},
            _id: '',
            date: '',
            venue: '',
            artists: [],
            seen: false,
            ticket: false
        }
    }

    componentDidMount() {
        const params = { ...this.props.match.params }
        const showId = params.showId
        this.fetchShow(showId)
    }

    fetchShow = async showId => {
        const result = await fetch(`/api/shows/${showId}`)
        const data = await result.json()
    
        const {
            _id,
            date,
            venue,
            artists,
            seen,
            ticket
        } = data

        this.setState({
            _id,
            date,
            venue,
            artists,
            seen,
            ticket,
            show: data
        })
    }

    toggleEditForm = () => {
        this.setState({
            toggleEditForm: !this.state.toggleEditForm,
        })
    }

    updateShow = async showData => {
        await this.props.updateShow(showData)
        const showId = showData.data[0]._id 
        this.fetchShow(showId)
    }
    
    render() {
        return (
            <Card style={{ maxWidth: 345 }}>
                <CardContent>
                    {this.state.toggleEditForm
                        ? <ShowForm type="update" updateShow={this.updateShow} toggleEditForm={this.toggleEditForm} handleVenueChange={this.handleVenueChange} showData={this.state.show} deleteShow={this.props.deleteShow} />
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

                            <Button onClick={this.toggleEditForm}>Edit Show</Button>

                        </Typography>
                    }
                </CardContent>
            </Card>
        )
    }
}

export default DetailedShow
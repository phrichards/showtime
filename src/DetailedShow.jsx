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

    async componentDidMount() {
        console.log('detailed', {...this.props.match.params})
        const params = { ...this.props.match.params }
        const showId = params.showId

        const result = await fetch(`/api/shows/${showId}`)
        const data = await result.json()
        console.log('show', data)

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
            ticket
        })
    }

    // componentWillReceiveProps() {
    //     const {
    //         _id,
    //         date,
    //         venue,
    //         artists
    //     } = this.props.data

    //     this.setState({
    //         _id,
    //         date,
    //         venue,
    //         artists,
    //     })
    // }

    toggleEditForm = () => {
        console.log('click')
        this.setState({
            // showArtistInput: true,
            // showSaveButton: true
            toggleEditForm: !this.state.toggleEditForm,
        })
    }

    updateShow = showData => {
        this.props.updateShow(showData)
    }

    saveEditForm = () => {
        console.log('save')
    }
    
    render() {
        return (
            <Card style={{ maxWidth: 345 }}>
                <CardContent>
                    {this.state.toggleEditForm
                        ? <ShowForm type="update" updateShow={this.updateShow} toggleEditForm={this.toggleEditForm} handleVenueChange={this.handleVenueChange} showData={this.props.data} deleteShow={this.props.deleteShow} />
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

export default DetailedShow
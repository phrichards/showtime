import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import MomentUtils from '@date-io/moment'
import DateFnsUtils from '@date-io/date-fns';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'

import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Card,
    CardContent,
    Typography,
} from '@material-ui/core'

import { getToken, verifyToken } from './services/tokenService';

class ShowForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            date: null,
            venue: null,
            notes: null,
            artists: [],
            artistInputs: [],
            ticketChecked: false,
            seenChecked: false,
            userId: null
        }
    }

    componentDidMount() {
        const token = getToken()
        const verified = verifyToken(token)

        let userId = null

        if (verified) {
            userId = verified.user.id
            this.setState({ userId })
        }

        if (this.props.showData) {
            const artistInputArray = this.props.showData.artists.map(artist => <TextField value={artist} onChange={this.handleArtistChange} name={artist} />)
            this.setState({
                artistInputs: artistInputArray,
                artists: this.props.showData.artists,
                ticketChecked: this.props.showData.ticket,
                seenChecked: this.props.showData.seen,
                venue: this.props.showData.venue,
                notes: this.props.showData.notes,
            })
        }
        
    }

    handleAddArtistClick = () => {
        const prevArtists = this.state.artists
        const nextArtists = [...prevArtists, '']
        const prevState = this.state
        const newState = { artists: nextArtists }
        const nextState = Object.assign({}, prevState, newState)
        this.setState(nextState)
    }

    handleVenueChange = e => {
        this.setState({ venue: e.target.value })
    }

    handleNotesChange = e => {
        this.setState({ notes: e.target.value })
    }

    handleArtistChange = index => e => {
        const newArtists = this.state.artists.map((artist, artistIndex) => {
            if (index !== artistIndex) return artist
            const newArtistName = e.target.value
            return artist = newArtistName
        })

        this.setState({ artists: newArtists })
    }


    handleDateChange = date => {
        console.log('date', date)
        this.setState({ date: date })
    }

    handleCheckboxClick = name => event => {
        this.setState({ ...this.state, [name]: event.target.checked })
    }

    handleFormSubmit = async event => {
        event.preventDefault()
        
        const showData = {
            artists: this.state.artists,
            date: this.state.date,
            notes: this.state.notes,
            venue: event.target.venue.value,
            seen: this.state.seenChecked,
            ticket: this.state.ticketChecked,
            user: this.state.userId
        }

        let url = ''
        let method = ''

        if (this.props.type === 'update') {
            url = `/api/shows/update/${this.props.showData._id}`
            method = 'PUT'
        } else {
            url = '/api/shows/add'
            method = 'POST'
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(showData) 
            })

            const newShow = await response.json()
            
            if (this.props.type && this.props.type === 'update') {
                this.props.toggleEditForm()
                this.props.updateShow(newShow)
                return this.props.history.push(this.props.location.pathname)
            } else {
                this.props.addNewShow(newShow)
                return this.props.history.push("/")
            }
        } catch(error) {
            console.error(error)
            throw error
        }
    }

    deleteShow = async () => {
        var confirmDelete = window.confirm('Delete this show?')
        if (confirmDelete) {
            this.props.deleteShow(this.props.showData._id)
            return this.props.history.push("/")
        }
        
    }

    render() {
        return (
            <Typography variant="body2" color="textSecondary" component="p">
                <form onSubmit={this.handleFormSubmit}>
                    {this.state.artists.map((artist, index) => (
                        <div className="artist">
                            <TextField
                                label={`Artist #${index + 1} name`}
                                value={artist}
                                onChange={this.handleArtistChange(index)}
                            />
                        </div>
                    ))}
                    
                    <p><Button onClick={this.handleAddArtistClick}>Add an artist</Button></p>
                    
                    <p>
                        <TextField 
                            value={this.state.venue}
                            label="Venue"
                            name="venue"
                            onChange={this.handleVenueChange}
                            style={{ width: 400 }}
                        />
                    </p>
                
                    <p>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>

                            <DateTimePicker 
                                value={
                                    this.props.showData 
                                    ? this.props.showData.date 
                                    : this.state.date
                                } 
                                label="Date/Time"
                                onChange={this.handleDateChange} 
                                style={{ width: 400 }}
                            />
                        
                        </MuiPickersUtilsProvider>
                    </p>

                    <FormControlLabel
                        control={
                            <Checkbox checked={this.state.ticketChecked} onChange={this.handleCheckboxClick('ticketChecked')} value="ticketChecked" />
                        }
                        label="Do you have a ticket?"
                    />
                    
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={this.state.seenChecked} 
                                onChange={this.handleCheckboxClick('seenChecked')} value="seenChecked" 
                            />
                        }
                        label="Did you attend this show?"
                    />

                    <p>
                        <TextField 
                            multiline rows="10" 
                            onChange={this.handleNotesChange} 
                            value={this.state.notes} 
                            style={{ width: 400 }}>
                        </TextField>
                    </p>

                    {
                    this.props.type 
                        ? 
                            <>
                            <Button type="submit">Save show</Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                className="delete"
                                onClick={this.deleteShow}
                            >
                                Delete
                            </Button>
                            </>
                        : 
                            <Button variant="contained" color="primary" type="submit">Add show</Button>
                    }
                </form>
            </Typography>
        )
    }
}

export default withRouter(ShowForm)
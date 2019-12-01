import React, { Component } from 'react'

import DateFnsUtils from '@date-io/date-fns';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel
} from '@material-ui/core'

class ShowForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            date: null,
            venue: null,
            artists: [],
            artistInputs: [],
            ticketChecked: false,
            seenChecked: false,
        }
    }

    componentDidMount() {
        if (this.props.showData) {
            const artistInputArray = this.props.showData.artists.map(artist => <TextField value={artist} onChange={this.handleArtistChange} name={artist} />)
            this.setState({
                artistInputs: artistInputArray,
                artists: this.props.showData.artists,
                ticketChecked: this.props.showData.ticket,
                seenChecked: this.props.showData.seen,
                venue: this.props.showData.venue
            })
        }
        
    }

    handleAddArtistClick = () => {
        this.setState(prevState => ({
            artistInputs: [...prevState.artistInputs, <TextField placeholder="Artist/Band" name="artist" onChange={this.handleArtistChange} />]
        }))
    }

    handleVenueChange = e => {
        this.setState({ venue: e.target.value })
    }

    handleArtistChange = e => {
        console.log('change')
        console.log(e.target.value)
        console.log(this.state.artistInputs)
        console.log(this.state.artists)
        this.setState({ artists: [...this.state.artists, e.target.value], });
    }

    handleDateChange = date => {
        this.setState({ date: date })
    }

    handleCheckboxClick = name => event => {
        this.setState({ ...this.state, [name]: event.target.checked })
    }

    handleFormSubmit = async e => {
        e.preventDefault()
        
        const artistArray = []

        console.log('length', e.target.artist.length)

        if (typeof(e.target.artist.length) === 'undefined') {
            artistArray.push(e.target.artist.value)
        } else {
            const artists = Array.from(e.target.artist)
            artists.forEach(artist => {
                if (artist.value.length) {
                    artistArray.push(artist.value)
                }
            })

            console.log('artistArray', artistArray)
        }
        
        const showData = {
            artists: artistArray,
            date: this.state.date,
            venue: e.target.venue.value,
            seen: this.state.seenChecked,
            ticket: this.state.ticketChecked
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
            });
            const newShow = await response.json()
            
            if (this.props.type && this.props.type === 'update') {
                this.props.toggleEditForm()
                this.props.updateShow(newShow)
            } else {
                this.props.addNewShow(newShow)
            }
            
        } catch(error) {
            console.error(error)
            throw error
        }
    }

    deleteShow = async () => {
        var confirmDelete = window.confirm('Delete this show?')
        if (confirmDelete) {
            return this.props.deleteShow(this.props.showData._id)
        }
        
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                { this.state.artistInputs.map(input => <p>{input}</p> )}
                
                <p><Button onClick={this.handleAddArtistClick}>Add an artist</Button></p>
                
                <TextField 
                    value={this.state.venue}
                    placeholder="Venue"
                    name="venue"
                    onChange={this.handleVenueChange}
                />
            
                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                    <DateTimePicker 
                        value={
                            this.props.showData 
                            ? this.props.showData.date 
                            : this.state.date
                        } 
                        onChange={this.handleDateChange} 
                    />
                
                </MuiPickersUtilsProvider>

                <FormControlLabel
                    control={
                        <Checkbox checked={this.state.ticketChecked} onChange={this.handleCheckboxClick('ticketChecked')} value="ticketChecked" />
                    }
                    label="Do you have a ticket?"
                />
                
                <FormControlLabel
                    control={
                        <Checkbox checked={this.state.seenChecked} onChange={this.handleCheckboxClick('seenChecked')} value="seenChecked" />
                    }
                    label="Did you attend this show?"
                />

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
                        <Button type="submit">Add show</Button>
                }
            </form>
        )
    }
}

export default ShowForm
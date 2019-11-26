import React, { Component } from 'react'

import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';


import {
    TextField,
    Button
} from '@material-ui/core'

class ShowForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            date: null,
            location: null,
            lineup: [],
            lineupInputs: [<TextField onChange={this.handleLineupChange} placeholder="Artist/Band" />]
        }
    }

    renderLineupInputs = () => {
        let lineupInputs = [<TextField onChange={this.handleLineupChange} placeholder="Artist/Band" />]
        return lineupInputs
    }

    handleLineupChange = (event) => {
        console.log(event.target.value)
        // this.setState({ location: event.target.value })
    }

    handleAddArtistClick = () => {
        console.log('click')
        this.setState({
            // lineupInputs: {
            //     ...this.state.lineupInputs,
                
            // },
        })
    }

    handleDateChange = (date) => {
        console.log('date', date)
        this.setState({ date: date })
    }

    handleLocationChange = (event) => {
        console.log('location', event.target.value)
        this.setState({ location: event.target.value })
    }

    render() {
        return (
            <form>
                {this.renderLineupInputs}
                <Button onClick={this.handleAddArtistClick}>Add an artist</Button>
                <TextField value={this.state.location} onChange={this.handleLocationChange} placeholder="Location" />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker value={this.state.date} onChange={this.handleDateChange} />
                </MuiPickersUtilsProvider>
            </form>
        )
    }
}

export default ShowForm
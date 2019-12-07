import React, { Component } from 'react'
import moment from 'moment';

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
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
            notes: '',
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
            notes,
            seen,
            ticket
        } = data

        this.setState({
            _id,
            date,
            venue,
            artists,
            notes,
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
            <Card style={{ maxWidth: 1200 }}>
                <CardContent>
                    {this.state.toggleEditForm
                        ? <ShowForm type="update" updateShow={this.updateShow} toggleEditForm={this.toggleEditForm} handleVenueChange={this.handleVenueChange} showData={this.state.show} deleteShow={this.props.deleteShow} />
                        :
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
                            <CardMedia
                                style={{height: 0, paddingTop: '56.25%'}}
                                image="../img/sample.jpg"
                            />

                            <p><TextField disabled multiline rows="10" value={this.state.notes}></TextField></p>

                            <Button variant="contained" color="primary" onClick={this.toggleEditForm}>Edit Show</Button>
                            <Button variant="contained" color="secondary" href="/">Back</Button>                      

                        </Typography>
                    }
                </CardContent>
            </Card>
        )
    }
}

export default DetailedShow
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
    Grid
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
            ticket: false,
            showId: null
        }
    }

    componentDidMount() {
        const params = { ...this.props.match.params }
        const showId = params.showId
        this.setState({ showId })
        this.fetchShow(showId)
    }

    fetchShow = async showId => {
        const result = await fetch(`/api/shows/${showId}`)
        console.log('result', result.status)
        if (result.status === 404) {
            this.props.history.push('/')
        } else {
            const data = await result.json()

            const {
                _id,
                date,
                venue,
                artists,
                notes,
                seen,
                ticket
            } = data.data[0]

            this.setState({
                _id,
                date,
                venue,
                artists,
                notes,
                seen,
                ticket,
                show: data.data[0]
            })
        }
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
        // This component is fairly large, and it would probablt be easier to reason about if we broke it up into smaller pieces
        return (
            <>
                <h2>Show Detail</h2>
                <Card style={{ maxWidth: 1200 }}>
                    <CardContent>
                        {this.state.toggleEditForm
                            ? <ShowForm type="update" updateShow={this.updateShow} toggleEditForm={this.toggleEditForm} handleVenueChange={this.handleVenueChange} showData={this.state.show} deleteShow={this.props.deleteShow} showId={this.state.showId} />
                            :
                            <Typography variant="body2" color="textSecondary" component="p">
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>

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
                                    </Grid>               

                                    <Grid item xs={6}>
                                        <h2>Time & Location</h2>
                                        <List>
                                            <ListItem style={{ textAlign: 'center', margin: 0, padding: 0 }}>
                                                <ListItemText>{this.state.venue}</ListItemText>
                                            </ListItem>
                                            <ListItem style={{ textAlign: 'center', margin: 0, padding: 0 }}>
                                                <ListItemText>{moment(this.state.date).format('lll')}</ListItemText>
                                            </ListItem>
                                        </List>
                                    </Grid>

                                </Grid>

                                <h2>Photos</h2>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <CardMedia
                                            style={{height: 0, paddingTop: '56.25%'}}
                                            image="https://source.unsplash.com/800x600"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CardMedia
                                            style={{ height: 0, paddingTop: '56.25%'}}
                                            image="https://source.unsplash.com/800x600"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CardMedia
                                            style={{ height: 0, paddingTop: '56.25%' }}
                                            image="https://source.unsplash.com/800x600"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CardMedia
                                            style={{ height: 0, paddingTop: '56.25%' }}
                                            image="https://source.unsplash.com/800x600"
                                        />
                                    </Grid>
                                </Grid>
                                <p>&nbsp;</p>
                                <h2>Notes</h2>
                                <p><TextField disabled style={{width: 800}} multiline rows="10" value={this.state.notes}></TextField></p>

                                <Button color="primary" onClick={this.toggleEditForm}>Edit Show</Button>
                                <Button color="secondary" href="/">Back</Button>                      

                            </Typography>
                        }
                    </CardContent>
                </Card>
            </>
        )
    }
}

export default DetailedShow
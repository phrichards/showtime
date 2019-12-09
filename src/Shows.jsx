import React, { Component } from 'react'

import {
    Grid,
    Card
} from '@material-ui/core'

import Show from './Show'

class Shows extends Component {

    render() {
        return (
            <div className="show-list">
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                    <h2>Shows I've Seen</h2>
                    {
                        this.props.shows.map((show) => {
                            {
                                return show.seen
                                ? <Show key={show.id} data={show} updateShow={this.props.updateShow} deleteShow={this.props.deleteShow} />
                                : null
                            }
                        })
                    }
                    </Grid>

                    <Grid item xs={6}>
                    <h2>Upcoming Shows</h2>
                    {
                        this.props.shows.map((show) => {
                            {
                                return !show.seen
                                    ? <Show key={show.id} data={show} updateShow={this.props.updateShow} deleteShow={this.props.deleteShow} />
                                    : null
                            }
                        })
                    }
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Shows
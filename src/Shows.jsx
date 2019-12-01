import React, { Component } from 'react'

import Show from './Show'

class Shows extends Component {

    render() {
        return (
            <div>
                <h1>Seen Shows</h1>
                {
                    this.props.shows.map((show) => {
                        {
                            return show.seen
                            ? <Show key={show.id} data={show} deleteShow={this.props.deleteShow} />
                            : null
                        }
                    })
                }

                <h1>Upcoming Shows</h1>
                {
                    this.props.shows.map((show) => {
                        {
                            return !show.seen
                                ? <Show key={show.id} data={show} deleteShow={this.props.deleteShow} />
                                : null
                        }
                    })
                }
            </div>
        )
    }
}

export default Shows
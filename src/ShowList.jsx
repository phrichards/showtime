import React, { Component } from 'react'

import ShowForm from './ShowForm'
import Shows from './Shows'

class ShowList extends Component {

    render() {
        return (
            <>
                <p>Shows</p>
                <Shows shows={this.props.shows} updateShow={this.props.updateShow} deleteShow={this.props.deleteShow} />
                <p>Add a show</p>
                <ShowForm addNewShow={this.props.addNewShow} />
            </>
        )
    }
}

export default ShowList
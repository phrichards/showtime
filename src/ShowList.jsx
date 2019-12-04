import React, { Component } from 'react'

import ShowForm from './ShowForm'
import Shows from './Shows'

class ShowList extends Component {

    render() {
        return (
            <>
                <Shows shows={this.props.shows} updateShow={this.props.updateShow} deleteShow={this.props.deleteShow} />
                <h2>Add a show</h2>
                <ShowForm addNewShow={this.props.addNewShow} />
            </>
        )
    }
}

export default ShowList
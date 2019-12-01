import React, { Component } from 'react';

import './App.css';

import Shows from './Shows'
import ShowForm from './ShowForm'

class App extends Component {

  // IMPORTANT
  // Don't forget error handling or validation of inputs
  // Handle error at route level, last middleware after all routes
  // Services should throw errors up to router/controller

  constructor() {
    super()

    this.state = {
      shows: [],
    }
  }

  async componentDidMount() {
    const result = await fetch('/api/shows')
    const data = await result.json()
    const prevState = this.state
    const newState = { shows: data.data }
    const nextState = Object.assign({}, prevState, newState)
    this.setState(nextState)
  }

  addNewShow = newShow => {
    const prevShows = this.state.shows
    const nextShows = [...prevShows, newShow.data[0]]

    const prevState = this.state
    const newState = { shows: nextShows }
    const nextState = Object.assign({}, prevState, newState)
    this.setState(nextState)
  }

  deleteShow = async id => {
    try {
      const response = await fetch(`/api/shows/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      this.setState(prevState => ({ shows: prevState.shows.filter(show => show._id !== id) }));

    } catch (error) {
      console.error(error)
      throw error
    }
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Showtime</h1>
        </header>
        <p>Shows</p>
        <Shows shows={this.state.shows} deleteShow={this.deleteShow} />
        <p>Add a show</p>
        <ShowForm addNewShow={this.addNewShow} />
      </div>
    );
  }
}

export default App;

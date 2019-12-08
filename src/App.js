import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import {
  Container,
  Grid,
  Button
} from '@material-ui/core'

import './App.css';

import Login from './Login'
import ShowList from './ShowList'
import DetailedShow from './DetailedShow'
import AddShow from './AddShow'

import { getToken, verifyToken, removeToken } from './services/tokenService';

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
    this.fetchShows()
  }

  fetchShows = async () => {
    const token = getToken()
    const verified = verifyToken(token)
    if (typeof (verified.user) !== 'undefined') {
      const result = await fetch(`/api/shows/user/${verified.user.id}`)
      const data = await result.json()
      const prevState = this.state
      const newState = { shows: data.data }
      const nextState = Object.assign({}, prevState, newState)
      this.setState(nextState)
    }
  }

  addNewShow = newShow => {
    const prevShows = this.state.shows
    const nextShows = [...prevShows, newShow.data[0]]
    const prevState = this.state
    const newState = { shows: nextShows }
    const nextState = Object.assign({}, prevState, newState)
    this.setState(nextState)
  }

  updateShow = showData => {
    const prevShows = this.state.shows
    const prevState = this.state
    const showToUpdate = prevShows.find(show => show._id === showData.data[0]._id)
    const updatedShows = this.state.shows.map(show => (show._id === showData.data[0]._id ? Object.assign(show, showData.data[0]) : show))
    const newState = { shows: updatedShows }
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

  handleLogout = () => {
    removeToken()
    window.location = '/login'
  }

  render() {
    return (
      <>
        <header className='App-header'>
          <h1><a href="/">Showtime</a></h1>
        </header>
        <div className='App'>
          <Container maxWidth="lg">
            <Router>
              <Switch>
                <Route
                  exact path='/'
                  render={(renderProps) => (
                    <ShowList
                      {...renderProps}
                      shows={this.state.shows}
                      loggedIn={this.state.loggedIn}
                      updateShow={this.updateShow} 
                      deleteShow={this.deleteShow}
                      addNewShow={this.addNewShow}
                    />
                  )}
                />
                <Route
                  exact path='/login'
                  render={() => {
                    return (
                      <Login fetchShows={this.fetchShows} />
                    )
                  }}
                />
                <Route
                  exact path='/show/:showId'
                  render={(renderProps) => {
                    return (
                        <DetailedShow
                          {...renderProps}
                          updateShow={this.updateShow} deleteShow={this.deleteShow}
                        />
                      )
                  }}
                />
                <Route
                  exact path='/add'
                  render={(renderProps) => {
                    return (
                      <AddShow
                        {...renderProps}
                        addNewShow={this.addNewShow} deleteShow={this.deleteShow}
                      />
                    )
                  }}
                />
              </Switch>
            </Router>
            {
              getToken()
                ? <p><Button variant="contained" color="secondary" onClick={this.handleLogout}>Log out</Button></p>
                : null
            }
          </Container>
        </div>
      </>
    );
  }
}

export default App

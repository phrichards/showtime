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

import {
    createMuiTheme,
    MuiThemeProvider
} from '@material-ui/core/styles';

import './App.css';

import Login from './Login'
import Register from './Register'
import ShowList from './ShowList'
import DetailedShow from './DetailedShow'
import AddShow from './AddShow'

import { getToken, verifyToken, removeToken } from './services/tokenService';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#1976d2',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#fff',
        },
    },
});

class App extends Component {

    // IMPORTANT
    // Don't forget error handling or validation of inputs
    // Handle error at route level, last middleware after all routes
    // Services should throw errors up to router/controller

    // TODO SOME PRIORITIES -  2. add redirects to router for logged in state. 3. make sure right errors are being thrown in api. 4. add verification for new shows. 5. add /me route and the auth middleware

    constructor() {
        super()

        this.state = {
            user: null,
            shows: []
        }
    }

    async componentDidMount() {
        this.fetchShows()
    }

    fetchUser = async () => {
        const token = getToken()
        if (token) {
            console.log('yes token')
            try {
                const response = await fetch('/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                const { data } = await response.json()
                const [user] = data
                console.log('fetch user', user)
                this.setState({ user })
            } catch (err) {
                console.error(err)
            }
        } else {
            console.log('no token')
        }
    }

    fetchShows = async () => {
        console.log('fetch some shows')
        try {
            const token = getToken()
            if (token) {
                const verified = verifyToken(token)
                console.log('verified', verified)
                const result = await fetch(`/api/shows/user/${verified.user.id}`)
                const data = await result.json()
                console.log('shows', data.data)
                const prevState = this.state
                const newState = { shows: data.data, token: token }
                const nextState = Object.assign({}, prevState, newState)
                this.setState(nextState)
            }
        } catch (err) {
            throw err
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
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    handleLogout = () => {
        removeToken()
        window.location = '/login'
    }

    // FIXME all routes should redirect to /login if not logged in 

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <header className='App-header'>
                    <h1><a href="/">Showtime</a></h1>
                </header>
                <div className='App'>
                    <Container maxWidth="lg">
                        <Router>
                            <Switch>
                                <Route
                                    exact path='/'
                                    render={(renderProps) => {
                                        return <ShowList 
                                            updateShow={this.updateShow}
                                            addNewShow={this.addNewShow}
                                            deleteShow={this.deleteShow}
                                            shows={this.state.shows}
                                            fetchShows={this.fetchShows}
                                        />
                                    }}
                                />
                                <Route
                                    path='/login'
                                    render={(renderProps) => {
                                        return (this.state.user)
                                        ? <Redirect to='/' />
                                        : <Login fetchUser={this.fetchUser} />
                                        
                                    }}
                                />
                                <Route
                                    exact path='/register'
                                    render={(renderProps) => {
                                        return <Register />
                                    }}
                                />
                                <Route
                                    exact path='/show/:showId'
                                    render={(renderProps) => {
                                        return <DetailedShow 
                                            {...renderProps}
                                            updateShow={this.updateShow}
                                            addNewShow={this.addNewShow}
                                            deleteShow={this.deleteShow} 
                                        />
                                    }}
                                />
                                <Route
                                    exact path='/add'
                                    render={(renderProps) => {
                                        return <AddShow addNewShow={this.addNewShow}/>
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
            </MuiThemeProvider>
        );
    }
}

export default App

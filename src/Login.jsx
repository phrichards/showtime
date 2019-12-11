import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { setToken } from './services/tokenService'

import { 
    TextField,
    Button
} from '@material-ui/core'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            loggedIn: false,
        }
    }

    handleEmailChange = event => {
        this.setState({ email: event.target.value })
    }

    handlePasswordChange = event => {
        this.setState({ password: event.target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { email, password } = this.state
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const { data } = await response.json()
            const [tokenData] = data
            const { token } = tokenData
            setToken(token)
            this.props.fetchUser()
        } catch (err) {
            console.error(err)
        }
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <p><TextField fullWidth value={this.state.email} label="Email" onChange={this.handleEmailChange} /></p>
                    <p><TextField fullWidth label="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange} /></p>
                    <p><Button variant="contained" color="primary" type="submit">Log In</Button></p>
                </form>
                
                <p><Button href="/register" variant="contained" color="secondary">Register</Button></p>
            </>
        )
    }
}

export default withRouter(Login)
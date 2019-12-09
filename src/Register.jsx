import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { setToken } from './services/tokenService'

import { 
    TextField,
    Button
} from '@material-ui/core'

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
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

    handleSubmit = async event => {
        event.preventDefault()
        const { email, password } = this.state
        const userData = { email, password }

        try {
            const response = await fetch('/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            const user = await response.json()

            return this.props.history.push("/login")
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <p><TextField fullWidth value={this.state.email} label="Email" onChange={this.handleEmailChange} /></p>
                    <p><TextField fullWidth label="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange} /></p>
                    <p><Button variant="contained" color="primary" type="submit">Register</Button></p>
                </form>
            </>
        )
    }
}

export default withRouter(Register)
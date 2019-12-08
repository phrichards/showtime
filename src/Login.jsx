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
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            const user = await response.json()
            console.log("user", user)
            if (user.access_token) {
                const token = user.access_token
                this.props.setUserStatus(true)
                setToken(token)
                return this.props.history.push("/")
            }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <TextField value={this.state.email} label="Email" onChange={this.handleEmailChange} />
                    <TextField label="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    <Button variant="contained" color="primary" type="submit">Log In</Button>
                </form>
            </>
        )
    }
}

export default withRouter(Login)
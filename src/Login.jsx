import React, { Component } from 'react'

import { 
    TextField,
    Button
} from '@material-ui/core'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    handleEmailChange = event => {
        console.log(event.target.value)
        this.setState({ email: event.target.value })
    }

    handlePasswordChange = event => {
        console.log(event.target.value)
        this.setState({ password: event.target.value })
    }

    render() {
        return (
            <>
                <form>
                    <TextField value={this.state.email} label="Email" onChange={this.handleEmailChange} />
                    <TextField label="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    <Button variant="contained" color="primary" type="submit">Log In</Button>
                </form>
            </>
        )
    }
}

export default Login
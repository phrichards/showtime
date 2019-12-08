const jwt = require('jsonwebtoken')

// TODO: fix this
const SECRET = 'make it something super secret'

exports.setToken = (token) => {
    console.log('set token', token)
    localStorage.setItem('token', token);
};

exports.getToken = () => {
    return localStorage.getItem('token');
};

exports.removeToken = () => {
    localStorage.removeItem('token');
};

exports.verifyToken = (token) => {
    console.log("verify", token)
    try {
        return jwt.verify(token, SECRET)
    } catch (err) {
        console.error(err.message)
        return false
    }
}
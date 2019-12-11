const jwt = require('jsonwebtoken')

const SECRET = 'make it something super secret'

exports.setToken = (token) => {
    localStorage.setItem('token', token);
};

exports.getToken = () => {
    return localStorage.getItem('token');
};

exports.removeToken = () => {
    localStorage.removeItem('token');
};

exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET)
    } catch (err) {
        console.error(err.message)
        return false
    }
}
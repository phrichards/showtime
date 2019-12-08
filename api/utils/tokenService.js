const jwt = require('jsonwebtoken')

// TODO: fix this
const SECRET = 'make it something super secret'

exports.issueToken = (user) => {
    const { _id: id } = user

    const payload = {
        user: { id }
    }

    const token = jwt.sign(payload, SECRET)
    return token
}

exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET)
    } catch (err) {
        console.error(err.message)
        return false
    }
}
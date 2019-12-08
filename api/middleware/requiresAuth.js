'use strict'

const tokenService = require('../utils/tokenService')

exports.requiresAuth = async (req, res, next) => {
    const decoded = tokenService.verifyToken(token)
    if (decoded) {
        const { user: { id } } = decoded
        try {
            const user = await UserModel.findById(id)
            /**
             * NOTE: Pull out information you care about
             * We shouldn't return the whole user object because it has a hashed
             * password in it.
             */
            const { email } = user
            req.user = { id, email }
            /**
             * NOTE: important to return here
             * If we don't; we'll call res.status(401).send()
             */
            return next()
        } catch (err) {
            return next(err)
        }
    }
}
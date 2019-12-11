'use strict'

const { model: User } = require('./userModel')

exports.listUsers = async () => {
    try {
        const users = await User.find({})
        return users
    } catch (e) {
        throw e
    }
}

exports.getUser = async (email) => {
    try {
        const user = await User.findOne({ email })
        return user || null
    } catch (err) {
        console.error(err)
        throw err
    }
}

exports.findUserById = async (id) => {
    try {
        const user = await User.findById(id)
        if (user) {
            return user
        } else {
            throw new Error('bad data')
        }
    } catch (err) {
        throw err
    }
}

// TODO: Need some validation here, for empty username at least

exports.createUser = async (userData = {}) => {
    try {
        const user = new User(userData)

        const doc = await user.save()

        return doc
    } catch (e) {
        // 4. If error, throw and controller will catch
        throw e
    }
}

exports.updateUser = async (userId, userData) => {
    const user = await User.findById(userId)

    const {
        email,
        password
    } = userData

    try {
        const doc = await user.save()
        return doc
    } catch (e) {
        // 4. If error, throw and controller will catch
        throw e
    }
}

exports.deleteUser = async (userId) => {
    const user = await User.findById(userId)

    try {
        const deleted = await user.remove({ _id: userId })
        return deleted
    } catch (e) {

        throw e
    }
}
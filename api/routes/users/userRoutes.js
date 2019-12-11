'use strict'

const express = require('express')
const userRouter = express.Router()

const tokenService = require('../../utils/tokenService')
const userService = require('./userService')
const requiresAuth = require('../../middleware/auth')

userRouter.route('/')
    .post(async (req, res, next) => {
        const { email, password } = req.body
        try {
            const user = await userService.getUser(email)
            if (user) {
                res.status(409).json({ data: 'User with that email already exists' })
            } else {
                const newUser = await userService.createUser({email, password})
                const doc = await newUser.save()
                res.status(201).send()
            }
        } catch (error) {
            console.log('error', error)
            next(error)
        }
    })

userRouter.get('/me', requiresAuth, async (req, res, next) => {
    console.log('get me')
    try {
        const { user: { id: userId } } = req.token
        const user = await userService.findUserById(userId)
        console.log('me user', user)
        res.status(200).json({ data: [user] })
    } catch (err) {
        next(err)
    }
})

userRouter.route('/login')
    .post(async (req, res, next) => {
        const { email, password } = req.body
        try {
            const user = await userService.getUser(email)
            if (user) {
                const match = await user.comparePassword(password)
                if (match) {
                    const token = tokenService.issueToken(user)
                    res.status(200).json({ data: [{ token }] })
                } else {
                    res.status(401).send()
                }
            } else {
                res.status(404).send()
            }
        } catch (error) {
            console.log('error', error)
            next(error)
        }
    })

exports.userRouter = userRouter
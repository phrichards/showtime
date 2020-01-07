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
        } catch (err) {
            next(err)
        }
    })

userRouter.get('/me', requiresAuth, async (req, res, next) => {
    try {
        const { user: { id: userId } } = req.token
        const user = await userService.findUserById(userId)
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
            // We could improve readability here by inverting the checks:

            if (!user) {
                res.status(404).send()
            }

            const match = await user.comparePassword(password)
            if (!match) {
                res.status(401).send()
            }
            
            const token = tokenService.issueToken(user)
            res.status(200).json({ data: [{ token }] })

        } catch (err) {
            next(err)
        }
    })

exports.userRouter = userRouter
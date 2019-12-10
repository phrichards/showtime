'use strict'

const express = require('express')
const userRouter = express.Router()

const tokenService = require('../../utils/tokenService')
const userService = require('./userService')

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

userRouter.route('/login')
    .post(async (req, res, next) => {
        const { email, password } = req.body
        try {
            const user = await userService.getUser(email)

            if (user) {
                const match = await user.comparePassword(password)
                if (match) {
                    const token = tokenService.issueToken(user)
                    res.json({
                        access_token: token,
                        refresh_token: null,
                        refresh: '/api/users/login/refresh'
                    })
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
'use strict'

const express = require('express')
const userRouter = express.Router()

const { requiresAuth } = require('../../middleware/requiresAuth')

const tokenService = require('../../utils/tokenService')
const userService = require('./userService')

userRouter.route('/')
    .post(async (req, res, next) => {
        const { email, password } = req.body
        try {
            const user = await userService.createUser({email, password})
            console.log('user', user)
            const doc = await user.save()
            res.status(201).json(doc)
        } catch (err) {
            console.log('error', err)
            next(err)
        }
    })

userRouter.route('/login')
    .post(async (req, res, next) => {
        const { email, password } = req.body
        console.log('login request')
        console.log(email)
        console.log(password)
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
                    tokenService.setToken(token)
                } else {
                    res.status(401).send()
                }
            } else {
                res.status(404).send()
            }
        } catch (err) {
            console.log('error', err)
            next(err)
        }
    })

exports.userRouter = userRouter
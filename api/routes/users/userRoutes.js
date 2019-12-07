'use strict'

const express = require('express')
const userRouter = express.Router()

const { requiresAuth } = require('../../middleware/requiresAuth')

const { UserModel } = require('./userModel')
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
        try {
            const user = await UserModel.findOne({ email })

            if (user) {
                const match = await user.comparePassword(password)
                if (match) {
                    const token = issueToken(user)
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
        } catch (err) {
            next(err)
        }
    })

exports.userRouter = userRouter
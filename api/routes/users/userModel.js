const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = exports.schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        require: true
    }
})

userSchema.methods.comparePassword = function compare(password) {
    return bcrypt.compare(password, this.password)
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password') || user.isNew) {
        try {
            const hash = await bcrypt.hash(user.password, 10)
            user.password = hash
            return next()
        } catch (err) {
            return next(err)
        }
    } else {
        return next()
    }
})

exports.model = mongoose.model('User', userSchema)
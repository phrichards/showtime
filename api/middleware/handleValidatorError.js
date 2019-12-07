const { ValidationError } = Error

exports.handleValidationError = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        const errors = Object.keys(err.errors).map((key) => {
            const value = err.errors[key]
            const { message, type } = value
            return { message, type }
        })
        res.status(400).json({ errors })
    } else if (err.name === 'MongoError' && err.code === 11000) {
        const error = {
            message: `duplicate key: ${JSON.stringify(err.keyValue)}`,
            type: 'duplication key error'
        }
        res.status(400).json({ errors: [error] })
    } else {
        next(err)
    }
}
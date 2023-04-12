const { ValidationError } = require('sequelize');

const boomErrorLogin = (err, req, res, next) => {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
    next();
}

function ormErrorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
        res.status(409).json({
            statusCode: 409,
            message: err.name,
            errors: err.errors
        });
    }
    next(err);
}

module.exports = { boomErrorLogin, ormErrorHandler };
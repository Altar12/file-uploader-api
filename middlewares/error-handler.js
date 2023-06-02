const { StatusCodes } = require('http-status-codes');
const { INTERNAL_ERROR } = require('../errors/user-messages');

const errorHandler = (err, req, res, next) => {
    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || INTERNAL_ERROR
    };
    res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandler;
const { StatusCodes } = require('http-status-codes');
const { INVALID_ROUTE } = require('../errors/user-messages');

const defaultHandler = (req, res) => res.status(StatusCodes.NOT_FOUND).json({ msg: INVALID_ROUTE });

module.exports = defaultHandler;
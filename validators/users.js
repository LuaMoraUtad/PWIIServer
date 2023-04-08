const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateItem = [
    check("name").exists().notEmpty(), //.isLength(min:5, max:90)
    check("age").exists().notEmpty().isInt(),
    check("email").exists().notEmpty(),
    check("password").exists().notEmpty(),
    check("role").exists().isIn(['user', 'admin']),
    (req, res, next) => validateResults(req, res, next)
]

const validatorGetItem = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

module.exports = { validatorCreateItem ,validatorGetItem};

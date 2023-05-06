const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateItem = [
    check("name").exists().notEmpty(), //.isLength(min:5, max:90)
    check("email").exists().notEmpty(),
    check("password").exists().notEmpty(),
    check("age").exists().notEmpty().isInt(),
    check("ciudad").exists().notEmpty(),
    check("interes").exists().notEmpty(),
    check("recibirOfertas").exists().isIn(['true', 'false']),
    check("role").exists().isIn(['user', 'admin', 'merchant']),
    (req, res, next) => validateResults(req, res, next)
]

const validatorCreateUser = [
    check("name").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("password").exists().notEmpty(),
    check("age").exists().notEmpty().isInt(),
    check("ciudad").exists().notEmpty(),
    check("interes").exists().notEmpty(),
    check("recibirOfertas").exists().isIn(['true', 'false']),
    check("role").exists().isIn(['user', 'admin', 'merchant']),
    (req, res, next) => validateResults(req, res, next)
]

const validatorGetUser = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorUpdateUser = [
    check("name").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("password").exists().notEmpty(),
    check("age").exists().notEmpty().isInt(),
    check("ciudad").exists().notEmpty(),
    check("interes").exists().notEmpty(),
    check("recibirOfertas").optional(),
    check("role").optional(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorGetItem = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorGetCity = [
    check("ciudad").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

module.exports = { validatorCreateItem, validatorCreateUser, validatorGetItem, validatorGetCity, validatorGetUser, validatorUpdateUser };

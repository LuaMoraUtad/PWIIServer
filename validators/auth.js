const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorRegister = [
    check("name").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("password").exists().notEmpty(),
    check("age").exists().notEmpty().isInt(),
    check("ciudad").exists().notEmpty(),
    check("interes").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength( {min:8, max: 16} ),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorSetadmin = [
    check("email").exists().notEmpty().isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorGetUser = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorUpdate = [
    check("name").exists().notEmpty().isLength( {min:3, max: 99} ),
    check("age").exists().notEmpty().isNumeric(), //Puedes aplicarle un min y max también al número
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength( {min:8, max: 64} ),
    check("role").optional(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

module.exports = { validatorRegister, validatorLogin, validatorSetadmin, validatorGetUser, validatorUpdate };

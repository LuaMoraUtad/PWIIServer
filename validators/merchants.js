const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorGetMerchants = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorRegisterMerchants = [
    check("nombre").exists().notEmpty(),
    check("cif").exists().notEmpty(),
    check("direccion").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("telefono").exists().isInt(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorUpdateMerchants = [
    check("nombre").exists().notEmpty(),
    check("cif").exists().notEmpty(),
    check("direccion").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("telefono").exists().isInt(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

module.exports = { validatorGetMerchants, validatorRegisterMerchants, validatorUpdateMerchants };

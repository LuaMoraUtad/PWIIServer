const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { merchantsModel } = require("../models");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();


const getMerchants = async (req, res) => {
    try{
        var data = "";

        if(process.env.ENGINE_DB === 'nosql'){
            data = await merchantsModel.find({});
        }else{
            data = await merchantsModel.findAll();
        }
        
        res.send(data);
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_GET_MERCHANTS');
    }
}


/**
 * Obtener un detalle
 * @param {} req
 * @param {*} res
*/

const getMerchantsById = async (req, res) => {
    try{
        const {id} = matchedData(req);
        const data = await merchantsModel.findOne({where: {  id: id  }});

        res.send(data);
    }catch(err){
        console.log(err);
        handleHttpError(res, "ERROR_GET_ITEM");
    }
}

/**
 * Obtener un detalle
 * @param {} req
 * @param {*} res
*/

const registerMerchants = async (req, res) => {
    try{
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password};
        const dataMerchant = await merchantsModel.create(body);
        
        const data = {
            token: await tokenSign(dataMerchant),
            user: dataMerchant
        }
        
        res.send(data);
    }catch(err){
        console.log(err);
        handleHttpError(res, "ERROR_REGISTER_MERCHANT");
    }
}


module.exports = { getMerchants, getMerchantsById, registerMerchants };

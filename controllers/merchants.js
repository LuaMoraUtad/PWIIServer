const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { merchantsModel } = require("../models");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();
const { registerCtrlMerchant } = require("./auth");
const { registerPagina } = require("./webpages");

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
        const data = await merchantsModel.findOne({where: { id: id }});

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
        const dataMerchant = await merchantsModel.create(req);
        
        const reqUser = {
            name: req.nombre,
            age:-1,
            email: req.email,
            password: "123456" + req.nombre,
            role: "merchant"
        }
        
        const resUser = res;
        
        await registerCtrlMerchant(reqUser, resUser);
        
        const pagina = {
            idMerchant: dataMerchant.id,
            ciudad:"",
            actividad: "",
            titulo: "",
            resumen: ""
        }

        let varObj = {
            id: 1
        }

        await registerPagina(pagina, varObj);

        console.log(pagina);
        
        const data = {
            token: await tokenSign(resUser),
            idpagina : varObj.id,
            merchant: dataMerchant
        }

        res.send(data);
    }catch(err){
        console.log(err);
        handleHttpError(res, "ERROR_REGISTER_MERCHANT");
    }
}

const updateMerchants = async (req, res) => {
    try{
        const {id, ...body} = matchedData(req);
        const data = await merchantsModel.update(body, {where: { id: id }});
        
        res.send(data);
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_UPDATE_MERCHANT');
    }
}

const deleteMerchants = async (req, res) => {
    try{
        const {id} = matchedData(req);
        var data = "";
        
        data = await merchantsModel.destroy({where: { id: id }});
        
        if(data === 1){
            res.status(200).json({message:"Deleted successfully"});
        }else{
            res.status(404).json({message:"record not found"});
        }
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_DELETE_MERCHANT');
    }
}

module.exports = { getMerchants, getMerchantsById, registerMerchants, updateMerchants, deleteMerchants };

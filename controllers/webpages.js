const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { webpagesModel, usersModel, fotosModel, textosModel } = require("../models");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

const registerPagina = async (req,varObj) => {
    try{  
        const body = {...req};
        const dataPagina = await webpagesModel.create(body);

        varObj.id  = dataPagina.id;
    }catch(err){
        console.log(err);
        handleHttpError(res, "ERROR_REGISTER_WEBPAGE");
    }
}

const registerPaginaCompleta = async (req,res) => {
    try{  
        const reqOrigin = req;
        req = matchedData(req);
        //validar que el usuario que hace la peticion es admin
        const token = reqOrigin.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);
         
        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
            return;
        }
         
        const query = {
            // _id o id
            [propertiesKey.id]: dataToken[propertiesKey.id]
        }
         
        const useradmin = await usersModel.findOne({where: query});
        const idMerchant = useradmin.id;
        const body = {...req,idMerchant};
        const dataPagina = await webpagesModel.create(body);
        
        res.send(dataPagina);
    }catch(err){
        console.log(err);
        handleHttpError(res, "ERROR_REGISTER_WEBPAGE");
    }
}

const updatePagina = async (req, res) => {
    try{
        const {id, ...body} = matchedData(req);
        const data = await webpagesModel.update(body, {where: { id: id }});
        
        res.send(data);
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_UPDATE_WEBPAGE');
    }
}

const registerFotoPagina = async (req, res) => {
    try{  
        req = matchedData(req);
        const data = await fotosModel.create(req);

        res.send(data);
    }catch(err){
        console.log(err);
        handleHttpError(res, "ERROR_REGISTER_FOTO");
    }
}

const registerTextoPagina = async (req, res) => {
    try{  
        req = matchedData(req);
        const data = await textosModel.create(req);

        res.send(data);
    }catch(err){
        console.log(err);
        handleHttpError(res, "ERROR_REGISTER_TEXTO");
    }
}

const deletePagina = async (req, res) => {
    try{
        const {id} = matchedData(req);
        var data = "";
        
        data = await webpagesModel.destroy({where: { id: id }});
        data = await fotosModel.destroy({where: { idWebpage: id }});
        data = await textosModel.destroy({where: { idWebpage: id }});
        
        if(data === 1){
            res.status(200).json({message:"Deleted successfully"});
        }else{
            res.status(404).json({message:"record not found"});
        }
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_DELETE_WEBPAGE');
    }
}

module.exports = { registerPagina, registerPaginaCompleta, updatePagina, registerFotoPagina, registerTextoPagina, deletePagina };

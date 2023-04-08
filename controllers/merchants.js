const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const {handleHttpError} = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const {merchantsModel} = require("../models");
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
        console.log(err); //Opcional
        //handleHttpError(res, 'ERROR_GET_ITEMS', 404)
        handleHttpError(res, 'ERROR_GET_MERCHANTS'); //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
    }
}

module.exports = { getMerchants };

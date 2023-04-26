const { usersModel } = require('../models');
const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');

/**
 * Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
*/

const getItems = async (req, res) => {
    try{
        const data = await usersModel.findAll({});
        //const data = await usersModel.findOneData(id);
        res.send(data);
    }catch(err){
        //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
        handleHttpError(res, 'ERROR_GET_ITEMS', 403);
    }
}

const createItem = async (req, res) => {
    try{
        const body = matchedData("{'role':'admin'}"); //matchedData(req); //El dato filtrado por el modelo (probar con body=req)
        console.log(body);
        const data = await usersModel.create(body);
        
        res.send(data);
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_CREATE_ITEMS');
    }
}

const getItem = (req, res) => {
    //recepcionar el id del route
}

const getUsersCity = async (req, res) => {
    try{
        const {ciudad} = matchedData(req);
        const data = await usersModel.findOne({where: { ciudad: ciudad }});

        res.send(data);
    }catch(err){
        console.log(err);
        handleHttpError(res, "ERROR_GET_USER_CIUDAD");
    }
}

const updateItem = (req, res) => {}
const deleteItem = (req, res) => {}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, getUsersCity };

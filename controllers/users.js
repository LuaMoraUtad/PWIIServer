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

const createUser = async (req, res) => {
    try{
        const body = matchedData("{'role':'user'}");
        console.log(body);
        const data = await usersModel.create(body);
        
        res.send(data);
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_CREATE_USER');
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

const updateUser = async (req, res) => {
    try{
        const {id, ...body} = matchedData(req);
        //body.rol = "user";
        const data = await usersModel.update(body, {where: { id: id }});
        
        res.send(data);
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_UPDATE_USER');
    }
}

const deleteUser = async (req, res) => {
    try{
        const {id} = matchedData(req);
        var data = "";
        
        data = await usersModel.destroy({where: { id: id }});
        
        if(data === 1){
            res.status(200).json({message:"Deleted successfully"});
        }else{
            res.status(404).json({message:"record not found"});
        }
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_DELETE_USER');
    }
}

const updateItem = (req, res) => {}
const deleteItem = (req, res) => {}

module.exports = { getItems, getItem, createItem, createUser, updateItem, deleteItem, getUsersCity, updateUser, deleteUser };

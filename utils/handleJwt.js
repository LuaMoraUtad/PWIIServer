const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

/**
 * El objeto del usuario
 * @param {*} user
*/

const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            //_id: user._id,
            [propertiesKey.id]: user[propertiesKey.id],
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )
    return sign;
}

/**
 * Token de sesión
 * @param {*} tokenJwt
*/

const verifyToken = async (tokenJwt) => {
    try{
        return jwt.verify(tokenJwt, JWT_SECRET);
    }catch(err){
        console.log(err);
    }
}

module.exports = { tokenSign, verifyToken };

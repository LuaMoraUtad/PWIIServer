const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Merchants = sequelize.define(
    "merchants", //Nombre de la tabla
    {
        nombre: {
            type: DataTypes.STRING, //Puede definir el tamaño del STRING, por ejemplo, con STRING(64), que sería un VARCHAR(64) en MySQL
            allowNull: false
        },
        cif: {
            type: DataTypes.STRING
        },
        direccion:{
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        telefono:{
            type: DataTypes.BIGINT
        }
    },
    {
        timestamps: true
    }
)

module.exports = Merchants;

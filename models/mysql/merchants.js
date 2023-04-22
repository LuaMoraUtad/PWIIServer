const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Merchants = sequelize.define(
    "merchants",
    {
        nombre: {
            type: DataTypes.STRING,
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

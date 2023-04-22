const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
    "users", //Nombre de la tabla
    {
        name: {
            type: DataTypes.STRING, //Puede definir el tamaño del STRING, por ejemplo, con STRING(64), que sería un VARCHAR(64) en MySQL
            allowNull: false
        },
        email: {
            type: DataTypes.STRING
        },
        password:{
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
        },
        ciudad: {
            type: DataTypes.STRING
        },
        interes: {
            type: DataTypes.STRING
        },
        recibirOfertas: {
            type: DataTypes.ENUM,
            values: ["true", "false"],
            defaultValue: "true"
        },
        role:{
            type: DataTypes.ENUM,
            values: ["user", "admin", "merchant"],
            defaultValue: "user"
        }
    },
    {
        timestamps: true
    }
)

module.exports = User;

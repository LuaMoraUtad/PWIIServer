const express = require("express");
const cors = require("cors");
require('dotenv').config();
const dbConnect = require('./config/mongo');
const { sequelize, dbConnectMySql } = require("./config/mysql");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./docs/swagger");
const loggerStream = require("./utils/handleLogger");
const morganBody = require("morgan-body");

const app = express();

morganBody(app, {
    noColors: true, //limpiamos el String de datos lo máximo posible antes de mandarlo a Slack
    skip: function(req, res) { //Solo enviamos errores (4XX de cliente y 5XX de servidor)
        return res.statusCode < 400
    },
    stream: loggerStream
});

if (process.env.ENGINE_DB === 'nosql'){
    dbConnect();
    // Crea las colecciones por defecto si no existieran
}else{
    dbConnectMySql();
    sequelize.sync(); // Crea las tablas en la base de datos si no existieran
}

//Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)
app.use(cors());
app.use(express.json());
app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs)
);
app.use("/api", require("./routes")); //Lee routes/index.js por defecto
//app.use(express.static("storage")); // http://localhost:3000/file.jpg

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port);
    dbConnect();
});

module.exports = app;

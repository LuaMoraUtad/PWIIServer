const pathModels = (process.env.ENGINE_DB === 'nosql') ? './nosql/' : './mysql/';

const models = {
    usersModel: require(pathModels+'users'),
    merchantsModel: require(pathModels+'merchants'),
    webpagesModel: require(pathModels+'webpages'),
    fotosModel: require(pathModels+'fotos'),
    textosModel: require(pathModels+'textos'),
}

module.exports = models;

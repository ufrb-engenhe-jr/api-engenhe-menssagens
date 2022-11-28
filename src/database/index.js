const mongoose = require("mongoose");

mongoose.Promise = global.Promise

require('dotenv').config()

console.log(`${process.env.DBHOST}/${process.env.DBNAME}`)

module.exports = mongoose.connect(`mongodb://${process.env.DBHOST}/${process.env.DBNAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conexão realizada com sucesso');
}).catch(err => {
    console.error("Erro na conexão: " + err)
})
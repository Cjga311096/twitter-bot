const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./config.json');
let isConnected;

function connectToDatabase() {
    if (isConnected) {
        return Promise.resolve();
    }
    return mongoose.connect(config.mongo.url, { useNewUrlParser: true })
        .then(db => {
            isConnected = db.connections[0].readyState;
        }).catch(error=>{
            console.log(`Error al conectar con ${config.mongo.url}`);
        });
}

function disconnectToDatabase() {
    if (isConnected) {
        mongoose.disconnect().then(() => {
        }).catch()
    }
}
module.exports = {
    connectToDatabase,
    disconnectToDatabase
}
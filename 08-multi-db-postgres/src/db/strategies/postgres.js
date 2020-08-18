const ICrud = require('./interfaces/intefaceCrud');

class Postgres extends ICrud {
    constructor() {
        super()
    }
    
    isConnected() {

    }

    create(item) {
        console.log('salvo no Postgres');
    }

}

module.exports = Postgres;


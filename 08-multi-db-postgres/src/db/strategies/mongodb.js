const ICrud = require('./interfaces/intefaceCrud');

class MongoDB extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('salvo no MongoDB');
    }

}

module.exports = MongoDB;
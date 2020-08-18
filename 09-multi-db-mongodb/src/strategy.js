class NotImplementedException extends Error {
    constructor() {
        super("Not Implemented Exception")
    }
}

// simulando um inteface
class ICrud {
    create(item) {
        throw new NotImplementedException();
    }

    read(item) {
        throw new NotImplementedException();
    }

    update(id, item) {
        throw new NotImplementedException();
    }

    delete(id) {
        throw new NotImplementedException();
    }
}

// 'implementando' a interface ICrud
class MongoDB extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('salvo no MongoDB');
    }

}

class Postgres extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('salvo no Postgres');
    }

}

class ContextStrategy {
    constructor(strategy) {
        this._database = strategy
    }

    create(item) {
        return this._database.create(item);
    }

    read(item) {
        return this._database.read(item);
    }

    update(id, item) {
        return this._database.update(id, item);
    }

    delete(id) {
        return this._database.delete(id);
    }
}

const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create();

const contextPostgres = new ContextStrategy(new Postgres());
contextPostgres.create();
contextPostgres.delete();
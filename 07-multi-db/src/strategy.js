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
        return this._database.update(id);
    }
}
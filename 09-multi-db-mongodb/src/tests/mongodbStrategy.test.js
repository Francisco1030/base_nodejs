const assert = require('assert');
const MongoDB = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new MongoDB());
const MOCK_HEROI_CADASTRAR = { 
    nome: 'Gavião Negro',
    poder: 'flexas'
}

const MOCK_HEROI_ATUALIZAR = { 
    nome: 'Batman',
    poder: 'Dinheiro'
}

describe('MongoDB Strategy', function () {
    //this.timeout(Infinity);

    this.beforeAll(async () => {
        db = await context.connect();
        // await context.delete();
        // await context.create(MOCK_HEROI_ATUALIZAR);
    });

    it('MongoDB Connection', async function () {
        const result = await context.isConnected();
        const expected = 'Conectado';

        assert.equal(result, expected);
    });

});
const assert = require('assert');
const Postgres = require('../db/strategies/postgres');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new Postgres());
const MOCK_HEROI_CADASTRAR = { 
    nome: 'Gavião Negro',
    poder: 'flexas'
}

describe('Postgres Strategy', function() {
    this.timeout(Infinity);

    this.beforeAll(async function() {
        db = await context.connect();
    });

    it('PostgresSQL Connection', async function () {
        const result = await context.isConnected();

        assert.equal(result, true);
    });

    it('Cadatrar', async function() {
        const result = await context.create(MOCK_HEROI_CADASTRAR);
        delete result.id;
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    });
});
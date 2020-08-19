const assert = require('assert');
const MongoDB = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new MongoDB());
const MOCK_HEROI_CADASTRAR = { 
    nome: 'Gavião Negro',
    poder: 'flexas'
}

const MOCK_HEROI_DEAFALT = { 
    nome: `Homem Aranha-${Date.now()}`,
    poder: 'Super teia'
}

describe('MongoDB Strategy', function () {
    //this.timeout(Infinity);

    this.beforeAll(async () => {
        db = await context.connect();
        // await context.delete();
        await context.create(MOCK_HEROI_DEAFALT);
    });

    it('MongoDB Connection', async () => {
        const result = await context.isConnected();
        const expected = 'Conectado';

        assert.deepEqual(result, expected);
    });

    it('Cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);

       assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
    });

    it('Listar', async () => {
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEAFALT.nome });

        const result = { nome, poder }

       assert.deepEqual(result, MOCK_HEROI_DEAFALT);
    });

});
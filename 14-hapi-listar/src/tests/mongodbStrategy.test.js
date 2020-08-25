const assert = require('assert');
const MongoDB = require('../db/strategies/mongodb/mongodb');
const HeroiSchema = require('../db/strategies/mongodb/schemas/herois.Schema');
const Context = require('../db/strategies/base/contextStrategy');

const MOCK_HEROI_CADASTRAR = { 
    nome: 'Gavião Negro',
    poder: 'flexas'
}

const MOCK_HEROI_DEAFALT = { 
    nome: `Homem Aranha-${Date.now()}`,
    poder: 'Super teia'
}

const MOCK_HEROI_ATUALIZAR = { 
    nome: `Homem de Ferro`,
    poder: 'dinhero'
}

let MOCK_HEROI_ID = '';
let context = {};

describe('MongoDB Strategy', function () {
    this.timeout(Infinity);

    this.beforeAll(async () => {
        const connection = MongoDB.connect();
        context = new Context(new MongoDB(connection, HeroiSchema));

        await context.create(MOCK_HEROI_DEAFALT);
        const result = await context.create(MOCK_HEROI_ATUALIZAR);
        MOCK_HEROI_ID = result._id;
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

    it('Atualizar', async () => {
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'R2D2'
        });

       assert.deepEqual(result.nModified, 1);
    });

    it('Remover', async () => {
        const result = await context.delete(MOCK_HEROI_ID);

       assert.deepEqual(result.n, 1);
    });
});
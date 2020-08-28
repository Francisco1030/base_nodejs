const assert = require('assert');
const api = require('../api');
const Context = require('./../db/strategies/base/contextStrategy');
const Postgres = require('./../db/strategies/postgres/postgres');
const UsuarioSchema = require('../db/strategies/postgres/schemas/usuarioSchema');

let app = {};
const USER = {
    username: 'Fcoviana',
    password: '123'
};

const USER_DB = {
    username: USER.username.toLowerCase(),
    password: '$2b$04$0z8vKig8.GpPtnVNN/KsHeoCSmxqlRrau59MJmE3anABGwTbs1P/C'
};

describe('Auth test suite', function () {
    this.beforeAll(async () => {
        app = await api;

        const connectionPostgres = await Postgres.connect();
        const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema);
        const postgres = new Context(new Postgres(connectionPostgres, model));
        await postgres.update(null, USER_DB, true);
    });

    it('deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.deepEqual(statusCode, 200);
        assert.ok(dados.token.length > 10);
    });

    it('deve retornar um nao autorizado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'pedro',
                password: '2323232'
            }
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        console.log(dados)

        assert.deepEqual(statusCode, 401);
        assert.ok(dados.error, "Unauthorized");
    });
});
const assert = require('assert');
const api = require('../api');
const { describe } = require('joi/lib/types/date');
const { items } = require('joi/lib/types/array');
let app = {};

describe('Auth test suite', function () {
    this.beforeAll(async () => {
        app = await api;
    });

    it('deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'Fcoviana',
                passeord: '123'
            }
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.deepEqual(statusCode, 200);
        assert.ok(dados.token.legth > 10);
    });
});
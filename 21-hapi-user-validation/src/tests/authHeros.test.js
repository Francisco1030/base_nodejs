const assert = require('assert');

describe('Auth test suite', function () {
    this.beforeAll(async () => {
        app = await api;
    });

    it('deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'fcoviana',
                password: '123'
            }
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        
        assert.deepEqual(statusCode, 200);
        assert.ok(dados.token.length > 10);
    });
});
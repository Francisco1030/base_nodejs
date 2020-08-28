const assert = require('assert');
const api = require('../api');

const  SENHA = 'JotQuest@kuy#@';

describe.only('UserHelp test suite', function () {
    // this.beforeAll(async () => {
    //     app = await api;
    // });

    it('deve gerar um hash a partir de uma senha', async () => {
        const result = {};

        assert.deepEqual(statusCode, 200);
        assert.ok(result.length > 10);
    });
});
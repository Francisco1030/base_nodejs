const assert = require('assert');

const PasswordHelper = require('./../helpers/passwordHelper');
const  SENHA = 'JotQuest@kuy#@';
const HASH = '$2b$04$27NThhe6xig/GASS3qtHVeAO57jOyNx5dfVsxNvCnh/D2S.S3gHJy';

describe.only('UserHelp test suite', function () {
    // this.beforeAll(async () => {
    //     app = await api;
    // });

    it('deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA);

        assert.ok(result.length > 10);
    });

    it('deve validar a senha', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH);
        
        assert.ok(result);
    });
});
const faker = require('faker')
const {
    deepEqual,
    ok
} = require('assert')

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    id: faker.random.number(),
    nome: faker.name.findName(),
    poder: faker.random.word()
}

describe('Suite de manipulação de Herois', () => {

    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    })

    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)
        deepEqual(resultado, expected)
    })
    it('deve cadastrar um heroi, usando arquivos', async () => {
        //const expected = { ...DEFAULT_ITEM_CADASTRAR, id: 2, name: 'Batman' }
        const expected = { ...DEFAULT_ITEM_CADASTRAR }
        const resultado = await database.cadastrar(expected)
        const [actual] = await database.listar(expected.id)

        deepEqual(actual, expected)
    })
})
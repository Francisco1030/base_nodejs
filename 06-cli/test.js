const faker = require('faker')
const {
    deepEqual,
    ok
} = require('assert')

const database = require('./database')

const DEFAULT_ITEM_DINANMIC = {
    id: faker.random.number(),
    nome: faker.name.findName(),
    poder: faker.random.word()
}

const DEFAULT_ITEM_STATIC = {
    id: 28011,
    nome: "Mr. Marshall King",
    poder: "Customer"
}

describe('Suite de manipulação de Herois', () => {

    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_DINANMIC)
    })

    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_DINANMIC
        const [resultado] = await database.listar(expected.id)
        deepEqual(resultado, expected)
    })
    it('deve cadastrar um heroi, usando arquivos', async () => {
        //const expected = { ...DEFAULT_ITEM_CADASTRAR, id: 2, name: 'Batman' }
        const expected = { ...DEFAULT_ITEM_DINANMIC }
        const resultado = await database.cadastrar(expected)
        const [actual] = await database.listar(expected.id)

        deepEqual(actual, expected)
    })
    it('deve romover um heroi por id', async () => {
        const expected = true;
        await database.cadastrar(DEFAULT_ITEM_STATIC)
        const resultado = await database.remover(DEFAULT_ITEM_STATIC.id)
        deepEqual(resultado, expected)
    })
    /* Testa somente esse teste*/
    // it.only('deve romover um heroi por id', async () => {
    //     const expected = true;
    //     await database.cadastrar(DEFAULT_ITEM_STATIC)
    //     const resultado = await database.remover(DEFAULT_ITEM_STATIC.id)
    //     deepEqual(resultado, expected)
    // })
})
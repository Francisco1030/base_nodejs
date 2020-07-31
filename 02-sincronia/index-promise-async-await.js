/*
0 - Obter um usuario;
1 - Obter o numero de telefone de um usuario a partir de seu Id.
2 - Obter o endereco do usuario pelo Id.
*/

// importe de um modulo interno node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)


function obterUsuario() {
    // Quando der problema -> reject(ERRO)
    // Quando sucesso -> resolve

    return new Promise(function resolvePromise(resolve, reject) {
        //return reject(new Error("DEU RUIM DE VERDADE!"))
        setTimeout(function () {
            return resolve({
                id: 1,
                nome: 'Francisco',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '98765542',
                ddd: '88'
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua ABC',
            numero: '321'
        })
    }, 2000);
}

// 1 - Automaticamente retornara uma Promise, quando se coloca async
main()
async function main() {
    try {
        console.time('medida-promise')

        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const endereco = resultado[1]
        const telefone = resultado[0]

        console.log(`
            Nome: ${usuario.nome}; 
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            Endereco: ${endereco.rua}
                    `)

        console.timeEnd('medida-promise')

    } catch (error) {
        console.log('DEU RUIM', error)
    }
}
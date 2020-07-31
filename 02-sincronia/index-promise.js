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

const usuarioPromise = obterUsuario()
// Para manipular sucesso usamos a função .then
// Para manipular erros usamos o .catch
// usuario -> telefone -> telefone

usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result) {
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result

            }
        });
    })
    .then(function (resultado) {
        console.log(`
            Nome: ${resultado.usuario.nome}; 
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
            Endereco: ${resultado.endereco.rua}
                    `)
    })
    .catch(function (error) {
        console.log("Ocorreu algum problema! " + error)
    })
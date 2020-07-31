/*
0 - Obter um usuario;
1 - Obter o numero de telefone de um usuario a partir de seu Id.
2 - Obter o endereco do usuario pelo Id.
*/

function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'Francisco',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '98765542',
            ddd: '88'
        })
    }, 2000)
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua ABC',
            numero: '321'
        })
    }, 2000);
}

function resolverUsuario(erro, usuario) {
    console.log('usuario: ', usuario)
}

function resolverTelefone(erro, telefone) {
    console.log('telefone: ', telefone)
}

function resolverEndereco(erro, endereco) {
    console.log('endereco: ', endereco)
}


obterUsuario(function resolverUsuario(erro, usuario) {
    // null || "" || 0 === false
    if (erro) {
        console.log('DEU ERRO em USUARIO', erro)
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
        if (erro1) {
            console.log('DEU ERRO em TELEFONE', erro)
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
            if (erro2) {
                console.log('DEU ERRO em TELEFONE', erro)
                return;
            }

            console.log(`Nome: ${usuario.nome}; Enderco: ${endereco.rua}, N ${endereco.numero}; Telefone: (${telefone.ddd}) ${telefone.telefone}`);
        })
    })

})

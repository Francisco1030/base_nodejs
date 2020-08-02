const { obterPessoas } = require('./service')

/* desestruturação

const item = {
    nome: 'Francisco',
    idade: 16,
}

cosnt { nome } = item

*/

Array.prototype.meuFilter = function (callback) {
    const lista = []
    for (index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        
        if(!result) continue;
        lista.push(item)
    }
    return lista;
}

async function main() {
    try {
        const { results } = await obterPessoas('a')
        
        // const familiaLars = results.filter(function (item) {
        //     // por padrao precisa retorna um booleano;
        //     // para informar se deve manter ou remover da lista;
        //     // false > remove da lista;
        //     // true > mantem na lista
        //     // não encotrou = -1
        //     // encontrou = possicaoNoArray
        //     const result = item.name.toLowerCase().indexOf(`lars`) !== -1
        //     return result
        // })
        
        const familiaLars = results.meuFilter((item, index, lista) => {
            return item.name.toLowerCase().indexOf(`lars`) !== -1
        })
        
        const nomes = familiaLars.map((pessoa) => pessoa.name)
        console.log(nomes)
    } catch (error) {
        console.error('deu ruim',error)
    }
}

main()
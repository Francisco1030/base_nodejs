const service = require('./service')

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []
    for (let indice = 0; indice < this.length; indice++) {
        const resultado = callback(this[indice], indice)
        novoArrayMapeado.push(resultado)
    }

    return novoArrayMapeado;
}

// O map é usado para manipular, rodar em cada item da lista e retornar algum valor;

async function main() {
    try {
        const results = await service.obterPessoas('a')
        
        // const nomes = [];
        // results.results.forEach(function (item) {
        //    nomes.push(item.name) 
        // })

        // const nomes = results.results.map(function (pessoa) {
        //     return pessoa.name
        // })

        //const nomes = results.results.map((pessoa) => pessoa.name)

        const nomes = results.results.meuMap(function (pessoa, indice) {
            return `${indice} - ${pessoa.name}`
        })

        console.log(nomes)

    } catch (error) {
        console.error('deu ruim')
    }
}

main()
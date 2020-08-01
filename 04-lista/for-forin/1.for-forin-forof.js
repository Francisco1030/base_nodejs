const serve = require('./service')

async function main() {
    try {
        const result = await serve.obterPessoas('a')
        const nomes = []
        
        console.time('for')
        for (let i = 0; i < result.results.length; i ++) {
            const pessoas = result.results[i]
            nomes.push(pessoas.name)
        }
        console.timeEnd('for')
        
        console.time('forin')
        for (let i in result.results) {
            const pessoas = result.results[i]
            nomes.push(pessoas.name)
        }
        console.timeEnd('forin')

        console.time('forof')
        for (pessoas of result.results) {
            nomes.push(pessoas.name)
        }
        console.timeEnd('forof')

        console.log('nomes: ', nomes)
    }
    catch (error) {
        console.error('error interno', error);
    }
}

main()
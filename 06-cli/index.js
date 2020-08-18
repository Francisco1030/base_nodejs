const Commander = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');

async function main() {
    Commander.version('v1')
        .option('-n --nome [value]', "Nome do Heroi")
        .option('-p --poder [value]', "Poder do Heroi")
        .option('-i --id [value]', "ID do Heroi")

        .option('-c --cadastrar', "Cadastrar um heroi")
        .option('-l --listar', "Listar um heroi")
        .option('-r --remover [value]', "Remove um heroi pelo id")
        .option('-a --atualizar [value]', "Atualiza um heroi pelo id")
        .parse(process.argv);

    const heroi = new Heroi(Commander);

    try {
        if (Commander.cadastrar) {
            // caso o id vinha undefined, ele vai deletar essa chave
            delete heroi.id;

            const resultado = await Database.cadastrar(heroi);
            if (!resultado) {
                console.error('Heroi não foi cadastrado!');
                return;
            }
            console.log('Heroi cadastrado com sucesso!');
        }

        if (Commander.listar) {
            const resultado = await Database.listar();
            console.log(resultado);
            return;
        }

        if (Commander.remover) {
            const resultado = await Database.remover(heroi.id);
            if (!resultado) {
                console.error('Heroi não foi removido!');
                return;
            }
            console.log('Heroi removido com sucesso!');
        }

        if (Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar);
            delete heroi.id;
            // remover todas as chaves que estejam null || undefined
            const dado = JSON.stringify(heroi);
            const heroiAtualizar = JSON.parse(dado);

            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar);
            if (!resultado) {
                console.error('Heroi não foi atualizado!');
                return;
            }
            console.log('Heroi atualizado com sucesso!');
        }

    } catch (error) {
        console.log('Deu ruim', error);
    }
}

main();
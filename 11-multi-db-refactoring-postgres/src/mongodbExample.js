// npm install mongoose

const Mongoose = require('mongoose');
Mongoose.connect('mongodb://localhost:27017/herois',
    { useNewUrlParser: true }, function (error) {
        if (!error) return;

        console.log('Falha na conexão', error);
    });

const connection = Mongoose.connection;

// function nomeFunc() {}
// const minhaFunc = function () {}
// const minhaFuncArrow = () => {}
// const minhaFuncArrow = (params) => console.log(params);

connection.once('open', () => console.log('databse rodando!'));
// setTimeout(() => {
//     const state = connection.readyState;
//     console.log('state', state);
// }, 1000);

/*
    0: Disconectado;
    1: Conectado
    2: Conectando
    3: Disconectando

*/

const heroisSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
});

const model = Mongoose.model('herois', heroisSchema);

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Mulher Maravilha',
        poder: 'algum'
    });

    console.log(resultCadastrar);

    const listItens = await model.find();
    console.log(listItens);
}

main();
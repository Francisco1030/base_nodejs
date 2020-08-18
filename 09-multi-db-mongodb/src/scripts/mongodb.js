// sudo docker ps
// docker ps
//     docker exec -it 2f9e16dc482e \
//         mongo -u fcoviana -p 123 --authenticationDatabase herois

//data base
show dbs

//midando o contexto para uma database
use herois

// mostra tables (coleçoes de documentos)
show collections

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-09-06'
})

db.herois.find()

db.herois.find().pretty()

for(let i = 0; i <= 10000; i++) {
    db.herois.insert({
        nome: `Clone ${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-09-06'
    })
}
db.herois.count()
db.herois.findOne()
db.herois.find().limit(1000).sort({ nome: -1 })
db.herois.find({}, { poder: 1, _id: 0 })

//create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-09-06'
})

//read
db.herois.find()

//update
db.herois.update({ _id: ObjectId("5f3c3f03540d5c4d9610797f")}, { nome: 'Mulher Maravilha'} )

db.herois.update({ _id: ObjectId("5f3c414f540d5c4d9610a081")}, { $set: {nome: 'Lanterna Verde'}} )

// add um novo campo name
db.herois.update({ _id: ObjectId("5f3c414f540d5c4d9610a081")}, { $set: {name: 'Lanterna Verde'}} )


db.herois.update({ poder: 'Velocidade' }, { $set: {poder: 'Super força'}} )

//deleta

//remove tudo
db.herois.remove({})

db.herois.remove({ nome: 'Lanterna Verde' })

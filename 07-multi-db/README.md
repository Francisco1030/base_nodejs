<h2 align="center"> Docker  </h2>


#### Dependências
- Docker

## ---- POSTGRES
``` shell
    docker run \
        --name postgres \
        -e POSTGRES_USER=fcoviana \
        -e POSTGRES_PASSWORD=root \
        -e POSTGRES_DB=hero \
        -p 5432:5432 \
        -d \
        postgres

    docker ps
    docker exec -it id_container /bin/bash


    docker run \
        --name adminer \
        -p 8080:8080 \
        --link postgres:postgres \
        -d \
        adminer
```

## ---- MONGODB
``` shell
    docker run \
        --name mongodb \
        -e MONGO_INITDB_ROOT_USERNAME=admin \
        -e MONGO_INITDB_ROOT_PASSWORD=admin \
        -p 27017:27017 \
        -d \
        mongo:4

    docker run \
        --name mongoclient \
        -p 3000:3000 \
        --link mongo:mongo \
        -d \
        mongoclient/mongoclient

    docker ps
    docker exec -it 2f9e16dc482e \
        mongo --host localhost -u admin -p admin --authenticationDatabase admin \
        --eval "db.getSiblingDB('herois').createUser({user: 'fcoviana', pwd: '123', roles: [{role: 'readWrite', db: 'herois'}]})"
```

<h4 align="center"> <em></></em> by <a href="https://github.com/Francisco1030" target="_blank"> Francisco Viana</a> </h4>

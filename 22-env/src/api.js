// npm i hapi
// npm i vision inert hapi-swagger
// npm i bcrypt

const Hapi = require('hapi');
const Context = require('./db/strategies/base/contextStrategy');
const MongoDb = require('./db/strategies/mongodb/mongodb');
const HeroiSchema = require('./db/strategies/mongodb/schemas/herois.Schema');
const HeroRoutes = require('./routes/heroRoutes');
const AuthRoute = require('./routes/authRoutes');

const Postgres = require('./db/strategies/postgres/postgres');
const UsuarioSchema = require('./db/strategies/postgres/schemas/usuarioSchema');

const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');

const HapiJwt = require('hapi-auth-jwt2');
const JWT_SECRET = 'API_TOKEN_JWT';

const app = new Hapi.Server({
    port: 5000
});

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]());
}

async function main() {
    const connection = MongoDb.connect();
    const context = new Context(new MongoDb(connection, HeroiSchema));

    const connectionPostgres = await Postgres.connect();
    const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema);

    const contextPostgres = new Context(new Postgres(connectionPostgres, model));


    const swaggerOptions = {
        info: {
            title: 'API Herois - #CursoNodeBR',
            version: 'v1.0'
        },
        lang: 'pt'
    }

    await app.register([
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     expiresIn: 20
        // }
        validate: async (dado, request) => {
            // verifica se o user é valido,
            // verifica se o user ta pagando

            const [result] = await contextPostgres.read({
                username: dado.username.toLowerCase(),
                // id: dado.id
            });

            if(!result) {
                return {
                    isValid: false
                }
            }
            return {
                isValid: true
            }
        }
    });

    app.auth.default('jwt');
    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET, contextPostgres), AuthRoute.methods())
    ]);

    await app.start();
    console.log('Servidor rodando na  porta', app.info.port);

    return app;
}

module.exports = main();
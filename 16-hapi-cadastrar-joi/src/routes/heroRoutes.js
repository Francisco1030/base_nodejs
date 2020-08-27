const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const failAction = (request, headers, error) => {
    throw error;
}

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                validate: {
                    // payload -> body
                    // headers -> header
                    // params -> na URL :id
                    // query -> ?skip=1&limit=100
                    failAction: failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query;

                    const query = nome ? { nome: { $regex: `.*${nome}*.` } } : {};

                    return this.db.read(nome ? query : {}, skip, limit);
                } catch (error) {
                    console.log('deu ruim', error);
                    return "Erro interno no servidor";
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                validate: {
                    failAction: failAction,
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(10),
                    }
                }
            },
            handler: async (request, headers) => {
                try {
                    const { nome, poder } = request.payload;

                    const result = await this.db.create({ nome, poder });

                    return {
                        message: 'Heroi cadastrado com sucesso!',
                        _id: result._id
                    };
                } catch (error) {
                    console.log('deu ruim', error);
                    return "Erro interno no servidor";
                }
            }

        }
    }
}

module.exports = HeroRoutes;
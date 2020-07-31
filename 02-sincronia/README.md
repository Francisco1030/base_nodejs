<h2 align="center"> Sincronia de funções JS </h2>

#### Dependências

* NodeJs
* NPM

------------

#### Comandos

###### Rodar Callback

``` shell
    node index-callback.js
```

###### Rodar Promise

``` shell
    node index-promise.js
```

#### Código

###### Callback

Em `index-callback.js` , temos um exemplo de `Callback` :

``` js
    function obterUsuario(callback) {
        setTimeout(function() {
            return callback(null, {
                id: 1,
                nome: 'Francisco',
                dataNascimento: new Date()
            })
        }, 1000)
    }
```

###### Promise

Em `index-promise.js` , temos um exemplo de `Promise` :

``` js
    function obterUsuario() {
        return new Promise(function resolvePromise(resolve, reject) {
            setTimeout(function() {
                return resolve({
                    id: 1,
                    nome: 'Francisco',
                    dataNascimento: new Date()
                })
            }, 1000)
        })
    }
```

Para manipular sucesso, usamos a função `.then` :

``` js
    .then(function(resultado) {
        ...
    })
```

Para manipular erros, usamos o `.catch` :

``` js
    .catch(function(error) {
        ...
    })
```

###### Async/Await

Em `index-promise-async-await.js` , temos um exemplo de `Async/Await` :

``` js
    async function main() { 
        const usuario = await obterUsuario()
    }
```

###### Callback em Promise
Para transformar uma função `callback` em  `Promise`, devemos:

###### Importar o util do node.js
``` js
    const util = require('util')
```

###### Converter a função
``` js
    const obterEnderecoAsync = util.promisify(obterEndereco)
```


------------

<h4 align="center"> <em></></em> by <a href="https://github.com/Francisco1030" target="_blank"> Francisco Viana</a> </h4>

<h2 align="center"> Funções para trabalhar com listas </h2>

#### Dependências

* NodeJs
* NPM

------------

#### Comandos

###### Rodar Callback

``` shell
    node index.js
```

###### Rodar Promise

``` shell
    node index-promise.js
```

#### Código

###### For

Em `for-forin` , temos um exemplo de `For` :

``` js
    for (let i = 0; i < result.results.length; i++) {
        const pessoas = result.results[i]
        nomes.push(pessoas.name)
    }
```

###### ForIn

Em `for-forin` , temos um exemplo de `ForIn` :

``` js
    for (let i in result.results) {
        const pessoas = result.results[i]
        nomes.push(pessoas.name)
    }
```

###### ForOf

Em `for-forin` , temos um exemplo de `ForOf` :

``` js
    for (pessoas of result.results) {
        nomes.push(pessoas.name)
    }
```

###### ForEach

Em `for-forin` , temos um exemplo de `ForEach` :

``` js
    results.results.forEach(function (item) {
        nomes.push(item.name) 
    })
```

###### Map

Em `for-forin` , temos um exemplo de `Map` :

``` js
    const nomes = results.results.map(function (pessoa) {
        return pessoa.name
    })
```


Para deixar o código ainda mais elegante:

``` js
    const nomes = results.results.map((pessoa) => pessoa.name)
```

###### Filter

Em `for-forin` , temos um exemplo de `Filter` :

``` js
    const familiaLars = results.filter(function (item) {
        const result = item.name.toLowerCase().indexOf(`lars`) !== -1
        return result
    })
```


Para deixar o código ainda mais elegante:

``` js
    const familiaLars = results.filter((item) => item.name.toLowerCase().indexOf(`lars`) !== -1)
    })
```

###### Reduce

Em `for-forin` , temos um exemplo de `Reduce` :

``` js
    const total = pesos.reduce((anterior, proximo) => {
        return anterior + proximo;
     })
```

------------

<h4 align="center"> <em></></em> by <a href="https://github.com/Francisco1030" target="_blank"> Francisco Viana</a> </h4>

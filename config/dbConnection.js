// importar o mongodb
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'got';

var dbConnection = function (dados) {
    mongo.connect(url, function (err, client) {
        // assert.equal(null, err);
        console.log('Conectado!');
        const db = client.db(dbName);
        if (dados.collection === "usuarios") {
            console.log("Usuario");
            queryUsuario(db, dados);
        } else if (dados.collection === "jogo") {
            console.log("jogo");
            queryjogo(db, dados);
        }
        client.close();
    })
};

function queryUsuario(db, dados) {
    var collection = db.collection(dados.collection);
    switch (dados.operacao) {
        case "inserir":
            collection.insertOne(dados.usuario, dados.callback);
            break;
        case "pesquisar":
            collection.find(dados.usuario, dados.callback);
        default:
            break;
    }
}

function queryjogo(db, dados) {
    var collection = db.collection(dados.collection);
    switch (dados.operacao) {
        case "inserir":
            var rand = Math.floor(Math.random() * 1000);
            collection.insertOne(
                {
                    usuario: dados.usuario,
                    moeda: 15,
                    suditos: 10,
                    temor: rand,
                    sabedoria: rand,
                    comercio: rand,
                    magia: rand
                },
                dados.callback);
            break;
        case "pesquisar":
            collection.find(dados.jogo, dados.callback);
        default:
            break;
    }
}

//Exportando uma variável e nao a conexão, para evitar aberturas desnecessárias.
module.exports = function () {
    return dbConnection;
};

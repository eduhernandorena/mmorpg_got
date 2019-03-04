function JogoDAO(connection){
    this._connection = connection;
}

JogoDAO.prototype.gerarParametros = function(usuario){
    var dados = {
        operacao: "inserir",
        usuario: usuario,
        collection: "jogo",
        callback: function (err, res) {}
    };
    this._connection(dados);
};

module.exports = function () {
    return JogoDAO;
};

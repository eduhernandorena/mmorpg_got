function UsuarioDAO(connection) {
    this._connection = connection;
}

UsuarioDAO.prototype.inserirUsuario = function (usuario) {
    var dados = {
        operacao: "inserir",
        usuario: usuario,
        collection: "usuarios",
        callback: function (err, res) {
        }
    };
    this._connection(dados);
};

UsuarioDAO.prototype.autenticar = function (usuario, req, res) {
    var dados = {
        operacao: "pesquisar",
        usuario: usuario,
        collection: "usuarios",
        callback: function (err, resu) {
            resu.toArray(function (err, result) {
                if (result[0] !== undefined) {
                    req.session.autorizado = true;

                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }

                if (req.session.autorizado) {
                    res.render("jogo", {img_casa: req.session.casa});
                } else {
                    res.render("index", {validacao: {}});
                }
            });
        }
    };
    this._connection(dados);

};

module.exports = function () {
    return UsuarioDAO;
};

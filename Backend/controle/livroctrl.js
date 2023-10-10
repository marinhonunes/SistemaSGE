import Livro from "../modelo/livro.js";

export default class LivroCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const isbn = dados.isbn;
            const titulo = dados.titulo;
            const autor = dados.autor;
            const editora = dados.editora;
            const anoPublicacao = dados.anoPublicacao;
            const edicao = dados.edicao;
            const numPaginas = dados.numPaginas;
            const genero = dados.genero;
            const dataEntrada = dados.dataEntrada;

            if (isbn && titulo && autor && editora && anoPublicacao && edicao && numPaginas && genero && dataEntrada) {
                const livro = new Livro(isbn, titulo, autor, editora, anoPublicacao, edicao, numPaginas, genero, dataEntrada);

                livro.gravar().then(() => {
                    resposta.json({
                        status: true,
                        mensagem: 'Livro cadastrado com sucesso.'
                    });
                }).catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: 'Erro ao cadastrar o Livro: ' + erro.message
                    });
                });
            } else {
                resposta.json({
                    status: false,
                    mensagem: 'Informe todos os dados do Livro, de acordo com a documentação.'
                });
            }
        } else {
            resposta.json({
                status: false,
                mensagem: 'Requisição inválida! Informe um livro no formato JSON.'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const isbn = dados.isbn;
            const titulo = dados.titulo;
            const autor = dados.autor;
            const editora = dados.editora;
            const anoPublicacao = dados.anoPublicacao;
            const edicao = dados.edicao;
            const numPaginas = dados.numPaginas;
            const genero = dados.genero;
            const dataEntrada = dados.dataEntrada;

            if (isbn && titulo && autor && editora && anoPublicacao && edicao && numPaginas && genero && dataEntrada) {
                const livro = new Livro(isbn, titulo, autor, editora, anoPublicacao, edicao, numPaginas, genero, dataEntrada);

                livro.atualizar().then(() => {
                    resposta.json({
                        status: true,
                        mensagem: 'Livro atualizado com sucesso'
                    });
                }).catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: 'Erro ao atualizar o Livro: ' + erro.message
                    });
                });

            } else {
                resposta.json({
                    status: false,
                    mensagem: 'Informe todos os dados do Livro, de acordo com a documentação.'
                });
            }
        } else {
            resposta.json({
                status: false,
                mensagem: 'Requisição inválida! Informe um livro no formato JSON para ser atualizado.'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const isbn = dados.isbn;

            if (isbn) {
                const livro = new Livro();
                livro.isbn = isbn;

                livro.excluir().then(() => {
                    resposta.json({
                        status: true,
                        mensagem: 'Livro excluído com sucesso.'
                    });
                }).catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: 'Erro ao excluir Livro: ' + erro.message
                    });
                });
            } else {
                resposta.json({
                    status: false,
                    mensagem: 'Informe o ISBN do Livro para ser excluído. (no formato JSON)'
                });
            }
        } else {
            resposta.json({
                status: false,
                mensagem: 'Requisição inválida! Informe um Livro no formato JSON para ser excluído.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'GET') {
            let termo = requisicao.query.termo;
            if (!termo) termo = '';
            const livro = new Livro();

            livro.consultar(termo).then((listaLivros) => {
                resposta.json(listaLivros);
            }).catch((erro) => {
                resposta.json({
                    status: false,
                    mensagem: 'Erro ao consultar Livro: ' + erro.message
                });
            });
        } else {
            resposta.json({
                status: false,
                mensagem: 'Requisição inválida! Informe um Livro no formato JSON para ser consultado.'
            });
        }
    }
}

import Livro from '../modelo/livro.js';
import conectar from './conectBanco.js';

export default class LivroDAO {
    async gravar(livro) {
        if (livro instanceof Livro) {
            const conexao = await conectar();
            const sql = 'INSERT INTO livro (isbn, titulo, autor, editora, anoPublicacao, edicao, numPaginas, genero, dataEntrada) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const parametros = [livro.isbn, livro.titulo, livro.autor, livro.editora, livro.anoPublicacao, livro.edicao, livro.numPaginas, livro.genero, livro.dataEntrada];
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(livro) {
        if (livro instanceof Livro) {
            const conexao = await conectar();
            const sql = 'UPDATE livro SET isbn = ?, titulo = ?, autor = ?, editora = ?, anoPublicacao = ?, edicao = ?, numPaginas = ?, genero = ?, dataEntrada = ? WHERE isbn = ?';
            const parametros = [livro.isbn, livro.titulo, livro.autor, livro.editora, livro.anoPublicacao, livro.edicao, livro.numPaginas, livro.genero, livro.dataEntrada, livro.isbn];
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(livro) {
        if (livro instanceof Livro) {
            const conexao = await conectar();
            const sql = 'DELETE FROM livro WHERE isbn = ?';
            const parametros = [livro.isbn];
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        if (!termo) termo = '';
        const listaLivros = [];
        const sql = 'SELECT * FROM livro WHERE titulo LIKE ?';
        const parametros = ['%' + termo + '%'];
        const [linhas] = await conexao.query(sql, parametros);
        for (const linha of linhas) {
            const livro = new Livro(linha.isbn, linha.titulo, linha.autor, linha.editora, linha.anoPublicacao, linha.edicao, linha.numPaginas, linha.genero, linha.dataEntrada);
            listaLivros.push(livro);
        }
        return listaLivros;
    }
}

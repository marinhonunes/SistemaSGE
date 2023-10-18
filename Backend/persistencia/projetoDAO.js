import Projeto from "../modelo/Projeto.js";
import conectar from "./Conexao.js";

export default class ProjetoDAO{
    async gravar(projeto){
        if(projeto instanceof Projeto){
            const conexao = await conectar();
            const sql = 'INSERT INTO projeto (nome, responsavel, dataInicial, dataFinal, participantes, descricao) VALUES (?, ?, ?, ?, ?, ?)';
            const parametros = [projeto.nome, projeto.responsavel, projeto.dataInicial, projeto.dataFinal, projeto.participantes, projeto.descricao];
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(projeto){
        if(projeto instanceof Projeto){
            const conexao = await conectar();
            const sql = 'UPDATE projeto SET responsavel = ?, dataInicial = ?, dataFinal = ?, participantes = ?, descricao = ? WHERE nome = ?';
            const parametros = [projeto.responsavel, projeto.dataInicial, projeto.dataFinal, projeto.participantes, projeto.descricao, projeto.nome];
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async excluir(projeto){
        if(projeto instanceof Projeto){
            const conexao = await conectar();
            const sql = 'DELETE FROM projeto WHERE nome = ?';
            const parametros = [projeto.nome];
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async consultar(termo){
        const conexao = await conectar();
        if(!termo) termo = "";
        const listaProjetos = [];
        const sql = 'SELECT * FROM projeto WHERE nome LIKE ?';
        const parametros = ['%' + termo + '%'];
        const [rows] = await conexao.query(sql ,parametros);
        for(const linha of rows){
            const projeto = new Projeto(linha.nome, linha.responsavel, linha.dataInicial, linha.dataFinal, linha.participantes, linha.descricao);
            listaProjetos.push(projeto);
        }
        return listaProjetos;
    }
}
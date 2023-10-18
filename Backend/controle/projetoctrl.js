import Projeto from "../modelo/Projeto.js";

export default class ProjetoCtrl{
    gravar(requisicao, resposta){
        resposta.type('application/json');
        if(requisicao.method === 'POST' && requisicao.is("application/json")){
            const dados = requisicao.body;
            const nome = dados.nome;
            const responsavel = dados.responsavel;
            const dataInicial = dados.dataInicial;
            const dataFinal = dados.dataFinal;
            const participantes = dados.participantes;
            const descricao = dados.descricao;
            if(nome && responsavel && dataInicial && dataFinal && participantes && descricao){
                const projeto = new Projeto(nome, responsavel, dataInicial, dataFinal, participantes, descricao);
                projeto.gravar().then(()=>{
                    resposta.json({
                        status:true,
                        mensagem:"Projeto cadastrado com sucesso."
                    })
                }).catch((erro)=>{
                    resposta.json({
                        status:false,
                        mensagem:"Erro ao cadastrar o Projeto" + erro.message
                    })
                });
            }
            else{
                resposta.json({
                    status:false,
                    mensagem:"Informe todos os dados do Projeto conforme a documentação." 
                })
            }
        }
        else{
            resposta.json({
                status:false,
                mensagem:"Requisição inválida! Informe um projeto no formato JSON para ser cadastrado." 
            })
        }
    }
    atualizar(requisicao, resposta){
        resposta.type('application/json');
        if(requisicao.method === 'PUT' && requisicao.is("application/json")){
            const dados = requisicao.body;
            const nome = dados.nome;
            const responsavel = dados.responsavel;
            const dataInicial = dados.dataInicial;
            const dataFinal = dados.dataFinal;
            const participantes = dados.participantes;
            const descricao = dados.descricao;
            if(nome && responsavel && dataInicial && dataFinal && participantes && descricao){
                const projeto = new Projeto(nome, responsavel, dataInicial, dataFinal, participantes, descricao);
                projeto.atualizar().then(()=>{
                    resposta.json({
                        status:true,
                        mensagem:"Projeto atualizado com sucesso."
                    })
                }).catch((erro)=>{
                    resposta.json({
                        status:false,
                        mensagem:"Erro ao atualizar o Projeto" + erro.message
                    })
                });
            }
            else{
                resposta.json({
                    status:false,
                    mensagem:"Informe todos os dados do Projeto conforme a documentação." 
                })
            }
        }
        else{
            resposta.json({
                status:false,
                mensagem:"Requisição inválida! Informe um projeto no formato JSON para ser atualizado." 
            })
        }
    }
    excluir(requisicao, resposta){
        resposta.type('application/json');
        if(requisicao.method === 'DELETE' && requisicao.is("application/json")){
            const dados = requisicao.body;
            const nome = dados.nome;
            if(nome){
                const projeto = new Projeto(nome);
                projeto.excluir().then(()=>{
                    resposta.json({
                        status:true,
                        mensagem:"Projeto excluído com sucesso."
                    })
                }).catch((erro)=>{
                    resposta.json({
                        status:false,
                        mensagem:"Erro ao excluir o Projeto" + erro.message
                    })
                });
            }
            else{
                resposta.json({
                    status:false,
                    mensagem:"Informe o nome do Projeto para ser excluído." 
                })
            }
        }
        else{
            resposta.json({
                status:false,
                mensagem:"Requisição inválida! Informe um projeto no formato JSON para ser excluído." 
            })
        }
    }
    consultar(requisicao, resposta){
        resposta.type('application/json');
        if(requisicao.method === 'GET'){
            let termo = requisicao.query.termo;
            if(!termo) termo = "";
            const projeto = new Projeto();
            projeto.consultar(termo).then((listaProjetos)=>{
                resposta.json(listaProjetos);
            }).catch((erro)=>{
                resposta.json({
                    status:false,
                    mensagem:"Erro ao consultar o projeto" + erro.message
                })
            })
        }
        else{
            resposta.json({
                status:false,
                mensagem:"Requisição inválida! Informe um projeto no formato JSON."
            })
        }
    }
}
function cdlivro() {
    window.location.href = '/CadastroLivro.html';
}

function cdprojeto(){
    window.location.href = '/CadastroProjeto.html'
}

function cdmenu(){
    window.location.href = '/menuSGE.html'
}

const botaoCadastrar = document.getElementById('cadastrar');
const botaoAtualizar = document.getElementById('atualizar');
const botaoExcluir = document.getElementById('excluir');
const formulario = document.getElementById('formulario');

function obterProjetoFormulario(){
    return {
        nome:document.getElementById('nome').value,
        responsavel:document.getElementById('responsavel').value,
        dataInicial:document.getElementById('dataInicial').value,
        dataFinal:document.getElementById('dataFinal').value,
        participantes:document.getElementById('participantes').value,
        descricao:document.getElementById('descricao').value
    }
}

function limparFormulario(){
    document.getElementById('nome').value = '';
    document.getElementById('responsavel').value = '';
    document.getElementById('dataInicial').value = '';
    document.getElementById('dataFinal').value = '';
    document.getElementById('participantes').value = '';
    document.getElementById('descricao').value = '';
}

botaoCadastrar.onclick = () => {
    if (formulario.checkValidity()) {
    const projeto = obterProjetoFormulario();
    cadastrarProjetos(projeto);
    prepararFormulario();
    }
    // }
    else{
        formulario.classList.add('was-validated');
    }
}

botaoAtualizar.onclick = () => {
    const projeto = obterProjetoFormulario();
    
    if (projeto.nome === '' || projeto.responsavel === '' || projeto.dataInicial === '' || projeto.dataFinal === '' || projeto.responsavel === '' || projeto.descricao === '') {
        mostrarMensagem('Por favor, preencha todos os campos obrigatórios.', 'danger');
    } else {
        if (formulario.checkValidity()) {
            atualizarProjeto(projeto);
            limparFormulario();
            mostrarProjetos();
        }
    }
}

botaoExcluir.onclick = () => {
    const projeto = obterProjetoFormulario();
    
    if (projeto.nome === '' || projeto.responsavel === '' || projeto.dataInicial === '' || projeto.dataFinal === '' || projeto.responsavel === '' || projeto.descricao === '') {
        mostrarMensagem('Por favor, preencha todos os campos obrigatórios.', 'danger');
    } else {
        if (formulario.checkValidity()) {
            apagarProjeto(projeto);
            limparFormulario();
            mostrarProjetos();
        }
    }
}


window.onload = ()=>{
    obterProjetos();
}

function mostrarMensagem(mensagem, tipo){
    let divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensagem}</div>`;
    
    setTimeout(() => {
        divMensagem.innerHTML = '';
    }, 5000);
}

function obterProjetos() {
    fetch('http://localhost:3214/projeto', { method: 'GET' })
        .then((resposta) => {
            if (resposta.status === 200) {
                return resposta.json();
            } else {
                return [];
            }
        })
        .then((listaProjetos) => {
            mostrarProjetos(listaProjetos);
        })
        .catch((erro) => {
            mostrarMensagem('Não foi possível obter os projetos do backend. ' + erro.message, 'danger');
        });
}


function cadastrarProjetos(projeto){
    fetch('http://localhost:3214/projeto',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(projeto)
    }).then((resposta)=>{
        if(resposta.status === 200){
            return resposta.json();
        }
        else{
            return {
                status: false,
                mensagem:'Não foi possível enviar o projeto para o backend'
            };
        }
    }).then((respostaBackend)=>{
        if(respostaBackend.status){
            mostrarMensagem(respostaBackend.mensagem, 'success');
            obterProjetos();
        }
        else{
            mostrarMensagem(respostaBackend.mensagem, 'danger');
        }
    }).catch((erro)=>{
        mostrarMensagem(erro.message, 'danger');
    });
}


function mostrarProjetos(listaProjetos){
    let elementoDivTabela = document.getElementById('espacoTabela');
    if (listaProjetos.length > 0){
        elementoDivTabela.innerHTML = '';
        let tabela = document.createElement('tabela');
        tabela.className = 'table table-striped table-hover';
        let cabecalhoTabela = document.createElement('thead');
        let corpoTabela = document.createElement('tbody');
        cabecalhoTabela.innerHTML = `<tr>
                                     <th>Nome</th>
                                     <th>Responsável</th>
                                     <th>Data Inicial</th>                                   
                                     <th>Data Final</th>
                                     <th>Participantes</th>
                                     <th>Descrição</th>
                                     <th>Ações</th>
                                    </tr>`;                          
        tabela.appendChild(cabecalhoTabela);


        for(const projeto of listaProjetos){
            const linhaTabela = document.createElement('tr');
            linhaTabela.innerHTML = `<td>${projeto.nome}</td>
                                     <td>${projeto.responsavel}</td>
                                     <td>${projeto.dataInicial}</td>
                                     <td>${projeto.dataFinal}</td>
                                     <td>${projeto.participantes}</td>
                                     <td>${projeto.descricao}</td>
                                     <td>
                                        <button style="display: inline-block;" type="button" class="btn btn-warning " id='atualizar' onClick="prepararFormulario('${projeto.nome}','${projeto.responsavel}','${projeto.dataInicial}','${projeto.dataFinal}','${projeto.participantes}','${projeto.descricao}','atualizacao')">Editar</button>
                                        <button style="display: inline-block;" type="button" class="btn btn-danger" id='excluir' onClick="prepararFormulario('${projeto.nome}','${projeto.responsavel}','${projeto.dataInicial}','${projeto.dataFinal}','${projeto.participantes}','${projeto.descricao}','exclusao')">Excluir</button>
                                     </td>
                                    `;
            corpoTabela.appendChild(linhaTabela);
        }
        tabela.appendChild(corpoTabela);
        elementoDivTabela.appendChild(tabela);
    }
    else{
        elementoDivTabela.innerHTML = `<div class="alert alert-warning" role="alert"> Nenhum projeto cadastrado!</div>`;
    }
}

function prepararFormulario(nome = "", responsavel = "", dataInicial = "", dataFinal = "", participantes = "", descricao = "", acao = "") {
    document.getElementById('nome').value = nome;
    document.getElementById('responsavel').value = responsavel;
    document.getElementById('dataInicial').value = dataInicial;
    document.getElementById('dataFinal').value = dataFinal;
    document.getElementById('participantes').value = participantes;
    document.getElementById('descricao').value = descricao;

    if (acao === 'exclusao') {
        document.getElementById('nome').disabled = true;
        botaoExcluir.disabled = false;
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = true;
    } else if (acao === 'atualizacao') {
        document.getElementById('nome').disabled = true;
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = false;
        botaoExcluir.disabled = true;
    } else {
        document.getElementById('nome').disabled = false;
        botaoCadastrar.disabled = false;
        botaoAtualizar.disabled = true;
        botaoExcluir.disabled = true;
    }
}

function apagarProjeto() {
    const nome = document.getElementById('nome').value;
    if (!nome) {
        mostrarMensagem('Por favor, insira um CPF válido.', 'danger');
        return;
    }
    if (confirm("Confirma a exclusão do projeto selecionado?")) {
        fetch('http://localhost:3214/projeto', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome })
        })
        .then((resposta) => {
            if (resposta.status === 200) {
                return resposta.json();
            } else {
                throw new Error('Não foi possível excluir o projeto do backend');
            }
        })
        .then((respostaBackend) => {
            if (respostaBackend.status) {
                mostrarMensagem(respostaBackend.mensagem, 'success');
                prepararFormulario();
                obterProjetos();
            } else {
                mostrarMensagem(respostaBackend.mensagem, 'danger');
            }
        })
        .catch((erro) => {
            mostrarMensagem(erro.message, 'danger');
        });
    } else {
        prepararFormulario();
    }
}



function atualizarProjeto(projeto){
    if (confirm("Confirma a atualização do projeto selecionado?")){
        fetch('http://localhost:3214/projeto',{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(projeto)
        }).then((resposta)=>{
            if(resposta.status === 200){
                return resposta.json();
            }
            else{
                return {
                    status: false,
                    mensagem:'Não foi possível atualizar o projeto no backend'
                };
            }
        }).then((respostaBackend)=>{
            if(respostaBackend.status){
                mostrarMensagem(respostaBackend.mensagem, 'success');
                prepararFormulario();
                obterProjetos();
            }
            else{
                mostrarMensagem(respostaBackend.mensagem, 'danger');
            }
        }).catch((erro)=>{
            mostrarMensagem(erro.message, 'danger');
        });
    }
}

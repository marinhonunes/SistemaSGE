function cdlivro() {
    window.location.href = '/CadastroLivro.html';
}

function cdprojeto(){
    window.location.href = '/CadastroProjeto.html'
}

function cdmenu(){
    window.location.href = '/menuSGE.html'
}

const endpoint = "http://localhost:3214/livros"; 
const botaoCadastrar = document.getElementById('submitButton'); 
const formulario = document.getElementById('formulario'); 

function obterLivroFormulario() {
    return {
        isbn: document.getElementById('isbn').value,
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        editora: document.getElementById('editora').value,
        anoPublicacao: parseInt(document.getElementById('anoPublicacao').value),
        edicao: parseInt(document.getElementById('edicao').value),
        numPaginas: parseInt(document.getElementById('numPaginas').value),
        genero: document.getElementById('genero').value,
        dataEntrada: document.getElementById('dataEntrada').value
    };
}

function limparFormulario() {
    document.getElementById('isbn').value = '';
    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('editora').value = '';
    document.getElementById('anoPublicacao').value = '';
    document.getElementById('edicao').value = '';
    document.getElementById('numPaginas').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('dataEntrada').value = '';
    formulario.classList.remove('was-validated');
}

botaoCadastrar.onclick = () => {
    if (formulario.checkValidity()) {
        const livro = obterLivroFormulario();
        cadastrarLivro(livro);
        limparFormulario();
    } else {
        formulario.classList.add('was-validated');
    }
};

window.onload = () => {
    obterLivros([]);
};

document.getElementById("excluir").onclick = excluirLivro;
document.getElementById("atualizar").onclick = atualizarLivro;

function mostrarMensagem(mensagem, tipo) {
    let divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = `<div class="alert alert-${tipo}" role="alert">
                                ${mensagem}
                            </div>`;

    setTimeout(() => {
        divMensagem.innerHTML = '';
    }, 5000);
}

function obterLivros() {
    fetch(endpoint, { method: 'GET' })
        .then((resposta) => {
            if (resposta.status === 200) {
                return resposta.json();
            } else {
                return [];
            }
        })
        .then((listaLivros) => {
            mostrarLivros(listaLivros);
        })
        .catch((erro) => {
            mostrarMensagem('Não foi possível obter os livros do backend. Erro: ' + erro.message, 'danger');
        });
}

function cadastrarLivro(livro) {
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(livro)
    })
        .then((resposta) => {
            if (resposta.status === 200) {
                return resposta.json();
            } else {
                return {
                    status: false,
                    mensagem: 'Não foi possível enviar o livro para o Backend.'
                };
            }
        })
        .then((respostaBackEnd) => {
            if (respostaBackEnd.status) {
                mostrarMensagem(respostaBackEnd.mensagem, 'success');
                prepararTela();
                obterLivros();
            } else {
                mostrarMensagem(respostaBackEnd.mensagem, 'danger');
            }
        })
        .catch((erro) => {
            mostrarMensagem(erro.message, 'danger');
        });
}

function mostrarLivros(listaLivros) {
    let elementoDivTabela = document.getElementById('espacoTabela');
    if (listaLivros.length > 0) {
        elementoDivTabela.innerHTML = '';
        let tabela = document.createElement('table');
        tabela.className = 'table table-striped table-hover';
        let cabecalhoTabela = document.createElement('thead');
        let corpoTabela = document.createElement('tbody');
        cabecalhoTabela.innerHTML = `<tr>
                                        <th>ISBN</th>
                                        <th>Título</th>
                                        <th>Autor</th>
                                        <th>Editora</th>
                                        <th>Ano de Publicação</th>
                                        <th>Edição</th>
                                        <th>Número de Páginas</th>
                                        <th>Gênero</th>
                                        <th>Data de Entrada</th>
                                        <th>Ações</th>
                                    </tr>`;
        tabela.appendChild(cabecalhoTabela);

        for (const livro of listaLivros) {
            const linhaTabela = document.createElement('tr');
            linhaTabela.innerHTML = `<td>${livro.isbn}</td>
                                 <td>${livro.titulo}</td>
                                 <td>${livro.autor}</td>
                                 <td>${livro.editora}</td>
                                 <td>${livro.anoPublicacao}</td>
                                 <td>${livro.edicao}</td>
                                 <td>${livro.numPaginas}</td>
                                 <td>${livro.genero}</td>
                                 <td>${livro.dataEntrada}</td>
                                 <td><button type="button" class="btn btn-warning" id='atualizar' onClick="prepararTela('${livro.isbn}', '${livro.titulo}', '${livro.autor}', '${livro.editora}', '${livro.anoPublicacao}', '${livro.edicao}', '${livro.numPaginas}', '${livro.genero}', '${livro.dataEntrada}', 'atualizacao')">Editar</button>
                                 <button type="button" class="btn btn-danger" id='excluir' onClick="prepararTela('${livro.isbn}', '${livro.titulo}', '${livro.autor}', '${livro.editora}', '${livro.anoPublicacao}', '${livro.edicao}', '${livro.numPaginas}', '${livro.genero}', '${livro.dataEntrada}', 'exclusao')">Excluir</button> </td>`;
            corpoTabela.appendChild(linhaTabela);
        }
        tabela.appendChild(corpoTabela);
        elementoDivTabela.appendChild(tabela);
    } else {
        elementoDivTabela.innerHTML = `<div class="alert alert-info" role="alert">
                                            Nenhum livro cadastrado!
                                        </div>`;
    }
}

function formatISODateToInputDate(isoDate) {
    const date = new Date(isoDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const day = String(date.getUTCDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

function prepararTela(isbn = "", titulo = "", autor = "", editora = "", anoPublicacao = "", edicao = "", numPaginas = "", genero = "", dataEntrada = "", acao = "") {
    let botaoCadastrar = document.getElementById("submitButton");
    let botaoAtualizar = document.getElementById("atualizar");
    let botaoExcluir = document.getElementById("excluir");

    document.getElementById('isbn').value = isbn;
    document.getElementById('titulo').value = titulo;
    document.getElementById('autor').value = autor;
    document.getElementById('editora').value = editora;
    document.getElementById('anoPublicacao').value = anoPublicacao;
    document.getElementById('edicao').value = edicao;
    document.getElementById('numPaginas').value = numPaginas;
    document.getElementById('genero').value = genero;
    document.getElementById('dataEntrada').value = dataEntrada;
    const formattedDate = formatISODateToInputDate(dataEntrada);
    document.getElementById('dataEntrada').value = formattedDate;
    if (acao === 'exclusao') {
        document.getElementById('isbn').disabled = true;
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = true;
        botaoExcluir.disabled = false;
    } else if (acao === 'atualizacao') {
        document.getElementById('isbn').disabled = true;
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = false;
        botaoExcluir.disabled = true;
    } else {
        document.getElementById('isbn').disabled = false;
        botaoCadastrar.disabled = false;
        botaoAtualizar.disabled = true;
        botaoExcluir.disabled = true;
    }
}

function excluirLivro() {
    if (confirm("Confirma a exclusão do livro selecionado?")) {
        fetch(endpoint, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                isbn: document.getElementById('isbn').value
            })
        })
            .then((resposta) => {
                if (resposta.ok) return resposta.json();
            })
            .then((respostaBackEnd) => {
                if (respostaBackEnd.status) {
                    mostrarMensagem(respostaBackEnd.mensagem, 'success');
                    prepararTela();
                    obterLivros();
                } else {
                    mostrarMensagem(respostaBackEnd.mensagem, 'danger');
                }
            })
            .catch((erro) => {
                mostrarMensagem(erro.message, 'danger');
            });
    } else {
        prepararTela();
    }
}

function atualizarLivro() {
    if (confirm("Confirma a atualização do livro?")) {
        const livro = obterLivroFormulario();
        fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livro)
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    return resposta.json();
                } else {
                    return {
                        status: false,
                        mensagem: 'Não foi possível atualizar o cadastro do livro no Backend.'
                    };
                }
            })
            .then((respostaBackEnd) => {
                if (respostaBackEnd.status) {
                    mostrarMensagem(respostaBackEnd.mensagem, 'success');
                    prepararTela();
                    obterLivros();
                } else {
                    mostrarMensagem(respostaBackEnd.mensagem, 'danger');
                }
            })
            .catch((erro) => {
                mostrarMensagem(erro.message, 'danger');
            });
    } else {
        prepararTela();
    }
}


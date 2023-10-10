import LivroDAO from "../persistencia/livroDAO.js"

export default class Livro {
    #isbn
    #titulo
    #autor
    #editora
    #anoPublicacao
    #edicao
    #numPaginas
    #genero
    #dataEntrada

    constructor (isbn, titulo, autor, editora, anoPublicacao, edicao, numPaginas, genero, dataEntrada){
        this.#isbn = isbn;
        this.#titulo = titulo;
        this.#autor = autor;
        this.#editora = editora;
        this.#anoPublicacao = anoPublicacao;
        this.#edicao = edicao;
        this.#numPaginas = numPaginas;
        this.#genero = genero;
        this.#dataEntrada = dataEntrada;
    }

    get isbn() {
        return this.#isbn;
    }

    set isbn(novoIsbn) {
        this.#isbn = novoIsbn;
    }

    get titulo() {
        return this.#titulo;
    }

    set titulo(novoTitulo) {
        this.#titulo = novoTitulo;
    }

    get autor() {
        return this.#autor;
    }

    set autor(novoAutor) {
        this.#autor = novoAutor;
    }

    get editora() {
        return this.#editora;
    }

    set editora(novaEditora) {
        this.#editora = novaEditora;
    }

    get anoPublicacao() {
        return this.#anoPublicacao;
    }

    set anoPublicacao(novoAnoPublicacao) {
        this.#anoPublicacao = novoAnoPublicacao;
    }

    get edicao() {
        return this.#edicao;
    }

    set edicao(novaEdicao) {
        this.#edicao = novaEdicao;
    }

    get numPaginas() {
        return this.#numPaginas;
    }

    set numPaginas(novoNumPaginas) {
        this.#numPaginas = novoNumPaginas;
    }

    get genero() {
        return this.#genero;
    }

    set genero(novoGenero) {
        this.#genero = novoGenero;
    }

    get dataEntrada() {
        return this.#dataEntrada;
    }

    set dataEntrada(novaDataEntrada) {
        this.#dataEntrada = novaDataEntrada;
    }

    toJSON(){
        return {
            isbn: this.#isbn,
            titulo: this.#titulo,
            autor: this.#autor,
            editora: this.#editora,
            anoPublicacao: this.#anoPublicacao,
            edicao: this.#edicao,
            numPaginas: this.#numPaginas,
            genero: this.#genero,
            dataEntrada: this.#dataEntrada
        }
    }

    async gravar(){
        const livroDAO = new LivroDAO();
        await livroDAO.gravar(this);
    }

    async atualizar(){
        const livroDAO = new LivroDAO();
        await livroDAO.atualizar(this);
    }

    async excluir(){
        const livroDAO = new LivroDAO();
        await livroDAO.excluir(this);
    }

    async consultar(termo){
        const livroDAO = new LivroDAO();
        return await livroDAO.consultar(termo);
    }
}

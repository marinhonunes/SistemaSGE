import ProjetoDAO from "../persistencia/ProjetoDAO.js";
export default class Projeto{
    #nome;
    #responsavel;
    #dataInicial;
    #dataFinal;
    #participantes;
    #descricao;
    constructor(nome, responsavel, dataInicial, dataFinal, participantes, descricao){
        this.#nome = nome;
        this.#responsavel = responsavel;
        this.#dataInicial = dataInicial;
        this.#dataFinal = dataFinal;
        this.#participantes = participantes;
        this.#descricao = descricao;
    }
    get nome(){
        return this.#nome;
    }
    set nome(n){
        this.#nome = n;
    }
    get responsavel(){
        return this.#responsavel;
    }
    set responsavel(r){
        this.#responsavel = r;
    }
    get dataInicial(){
        return this.#dataInicial;
    }
    set dataInicial(i){
        this.#dataInicial = i;
    }
    get dataFinal(){
        return this.#dataFinal;
    }
    set dataFinal(f){
        this.#dataFinal = f;
    }
    get participantes(){
        return this.#participantes;
    }
    set participantes(p){
        this.#participantes = p;
    }
    get descricao(){
        return this.#descricao;
    }
    set descricao(d){
        this.#descricao = d;
    }
    toJSON(){
        return{
            nome: this.#nome,
            responsavel: this.#responsavel,
            dataInicial: this.#dataInicial,
            dataFinal: this.#dataFinal,
            participantes: this.#participantes,
            descricao: this.#descricao
        }
    }
    async gravar(){
        const proDAO = new ProjetoDAO();
        await proDAO.gravar(this);
    }
    async atualizar(){
        const proDAO = new ProjetoDAO();
        await proDAO.atualizar(this);
    }
    async excluir(){
        const proDAO = new ProjetoDAO();
        await proDAO.excluir(this);
    }
    async consultar(termo){
        const proDAO = new ProjetoDAO();
        return await proDAO.consultar(termo);
    }
}
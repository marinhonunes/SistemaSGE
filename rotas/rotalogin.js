import { Router } from "express";

const rotalogin = Router();

rotalogin
.get('/',(requisicao, resposta)=>{
    resposta.redirect('/login.html');
})

.post('/', (requisicao, resposta) =>{
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario === 'sge' && senha === '123'){
        requisicao.session.usuarioLogado = true;
        resposta.redirect('/menuSGE.html');
    }
    else{
        resposta.send("<p>Usuário ou Senha inválida</p> <button onclick='history.back()'> Tentar novamente</button>");
    }
});

export default rotalogin;
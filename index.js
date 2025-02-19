import express from 'express';
import session from 'express-session';
import autenticar from './seguranca/autenticacao.js';
import rotalogin from './rotas/rotalogin.js';
import rotaLivro from './Backend/rotas/rotalivro.js';
import rotaProjeto from './Backend/rotas/rotaprojeto.js';

const host = '0.0.0.0';

const porta = 3214;

const app = express();

app.use(express.json());


app.use(session({
    secret: 'SG35I5T3M4',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));

app.use(express.urlencoded({extended: false}));
app.use(express.static('./publico'));
app.use('/projeto', rotaProjeto);
app.use('/livros', rotaLivro);
app.use('/login', rotalogin); 
app.use(autenticar, express.static('./protegido'));

app.get('/CadastroLivro', (requisicao, resposta) => {
    res.sendFile(__dirname + '/protegido/CadastroLivro.html'); 
  });

app.get('/CadastroProjeto', (requisicao, resposta) => {
    res.sendFile(__dirname + '/protegido/CadastroProjeto.html'); 
});

app.get('/menuSGE', (requisicao, resposta) => {
    res.sendFile(__dirname + '/protegido/menuSGE.html'); 
});

app.listen(porta, host, () =>{
    console.log('Servidor escutando em', host, porta);
});
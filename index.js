import express from 'express';
import session from 'express-session';
import autenticar from './seguranca/autenticacao.js';
import rotalogin from './rotas/rotalogin.js';
//rota aluno
//rota professor

const host = '0.0.0.0';

const porta = 3306;

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
// app.use('/alunos', rotaAluno);
app.use('/login', rotalogin);
app.use(autenticar, express.static('./protegido'));


app.listen(porta, host, () =>{
    console.log('Servidor escutando em', host, porta);
});
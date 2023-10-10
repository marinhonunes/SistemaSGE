import { Router } from "express";
import LivroCtrl from "../controle/livroctrl.js";

const rotaLivro = Router();

const LivroCtrl = new LivroCtrl();

rotaAluno.get('/:termo', LivroCtrl.consultar)
.get('/', LivroCtrl.consultar)
.post('/', LivroCtrl.gravar)
.put('/', LivroCtrl.atualizar)
.delete('/',LivroCtrl.excluir);

export default rotaLivro;
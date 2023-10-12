import { Router } from "express";
import LivroCtrl from "../controle/livroctrl.js";

const rotaLivro = Router();

const Livroct = new LivroCtrl();

rotaLivro.get('/:termo', Livroct.consultar)
.get('/', Livroct.consultar)
.post('/', Livroct.gravar)
.put('/', Livroct.atualizar)
.delete('/',Livroct.excluir);

export default rotaLivro;
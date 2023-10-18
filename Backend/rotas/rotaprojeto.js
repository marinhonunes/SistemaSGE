import { Router } from "express";
import ProjetoCtrl from "../controle/ProjetoCtrl.js";

const rotaProjeto = Router();

const proCTRL = new ProjetoCtrl();

rotaProjeto
.get('/:termo', proCTRL.consultar)
.get('/', proCTRL.consultar)
.post('/', proCTRL.gravar)
.put('/', proCTRL.atualizar)
.delete('/', proCTRL.excluir)

export default rotaProjeto;
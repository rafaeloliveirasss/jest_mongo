import {Router} from 'express';
import { UsersController } from './controllers/usersController';

const routes = Router();
const usersController = new UsersController();


// Rota para listar usuários
routes.get('/users', usersController.listarUsuario);

// Rota para criar um novo usuário
routes.post('/users', usersController.criarUsuario);

// Rota para editar um usuário existente
routes.put('/users', usersController.editarUsuario);

// Rota para excluir um usuário existente
routes.delete('/users', usersController.excluirUsuario);

export { routes }

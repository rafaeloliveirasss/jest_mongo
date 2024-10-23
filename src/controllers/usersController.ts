import { Request, Response } from 'express';
import { database } from '../database';

export  class UsersController {
    criarUsuario (req: Request, res: Response): Response{
        const { nome } = req.body;

        // Check if the name is valid
        if (!nome || nome.length < 1) {
            return res.status(400).json({ mensagem: 'Não é possível criar um usuário sem nome' });
        }

        // Add the user to the database
        database.push(nome);
        return res.status(201).json({ mensagem: `Usuário ${nome} criado` });
    }

    listarUsuario(req: Request, res: Response): Response {
        return res.status(200).json(database);
    }

    editarUsuario(req: Request, res: Response): Response {
        const { nomeAntigo, nomeNovo } = req.body;

        // Find the index of the old username
        const usuarioIndex = database.findIndex(usuario => usuario === nomeAntigo);

        // Check if the user exists
        if (usuarioIndex === -1) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        // Check if the new name is valid
        if (!nomeNovo || nomeNovo.length < 1) {
            return res.status(400).json({ mensagem: 'Nome novo inválido' });
        }

        // Update the user in the database
        database[usuarioIndex] = nomeNovo;
        return res.status(200).json({ mensagem: `Usuário ${nomeAntigo} atualizado para ${nomeNovo}` });
    }

    excluirUsuario(req: Request, res: Response): Response {
        const { nome } = req.body;

        // Find the index of the user to be deleted
        const usuarioIndex = database.findIndex(usuario => usuario === nome);

        // Check if the user exists
        if (usuarioIndex === -1) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        // Remove the user from the database
        database.splice(usuarioIndex, 1);
        return res.status(200).json({ mensagem: `Usuário ${nome} excluído` });
    }
}

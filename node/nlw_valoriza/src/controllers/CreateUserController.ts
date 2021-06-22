import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, admin } = req.body;

        const createUserService = new CreateUserService(); //chamando o UserService de services para cadastrar e validar

        const user = await createUserService.execute({name, email, admin}); //espera que o execute finalize e o usuario seja inserido ou nao

        return res.json(user); //retorna para o cliente um json com todos os dados do seu user criado
    }
}

export { CreateUserController };
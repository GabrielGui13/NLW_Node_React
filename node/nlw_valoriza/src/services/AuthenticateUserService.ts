import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from 'jsonwebtoken'

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories)
        //Verificar se email existe
        const user = await usersRepositories.findOne({ email })

        if (!user) {
            throw new Error('Email/Password incorrect')
        }

        // Verificar se senha esta correta
        // 12345 == HDBF88OWFH29F2349FG493 checa se sao iguais
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error('Email/Password incorrect')
        }

        //Gerar token
        const token = sign({
            email: user.email //primeiro parametro eh o payload
        }, "3aed62f0f1e95d15f957f29e59906099", { //chave secreta, deveria estar em variavel ambiente
            subject: user.id,
            expiresIn: "1d" //1 dia de vida do token
        });
        
        return token;
    }
}

export { AuthenticateUserService }
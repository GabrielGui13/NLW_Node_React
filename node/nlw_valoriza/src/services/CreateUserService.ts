import { getCustomRepository } from 'typeorm'; //como usa um repositorio customizado, essa eh a forma de instanciar
import { UsersRepositories } from '../repositories/UsersRepositories'
import { hash } from "bcryptjs" //biblioteca de criptografia para senhas

interface IUserRequest {
    name: string, 
    email: string,
    admin?: boolean,
    password: string
}

class CreateUserService {
    async execute({name, email, admin = false, password}: IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);
        //instancia o "UsersRepositories" importado de repositories, que por sua vez referencia a entidade "User" que referencia a tabela "users" criada pela migration "CreateUser"

        if (!email) { //Checa se o email foi definido
            throw new Error("Email undefined")
        }

        const userAlreadyExists = await usersRepository.findOne({
            email
        }) //checa na database se ha algum email igual o passado no objeto e retorna um boolean

        if (userAlreadyExists) {
            throw new Error("User already exists") //lanca um erro caso o userAlreadyExists ache um email ja existente
        }

        const passwordHash = await hash(password, 8); //password, salt(tipo de criptografia, tamanho do salt)

        const user = usersRepository.create({
            name, email, admin, password: passwordHash
        }) //cria uma instancia do usuario

        await usersRepository.save(user) //insere o user na database

        return user;
    }
}

export {CreateUserService};
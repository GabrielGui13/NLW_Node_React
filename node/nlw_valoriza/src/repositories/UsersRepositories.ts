import { EntityRepository, Repository } from "typeorm"
import { User } from "../entities/User"

@EntityRepository(User)
class UsersRepositories extends Repository<User> {} //repository é onde estão os métodos para acessar os banco de dados, select etc

export { UsersRepositories };
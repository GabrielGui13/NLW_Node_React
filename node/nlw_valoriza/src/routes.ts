import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controllers/ListTagsControllers";
import { ListUsersController } from "./controllers/ListUsersController"

const router = Router();
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentController = new ListUserSendComplimentsController();
const listUserReceiveComplimentController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post('/users', createUserController.handle) //o handle ja recebe o req e o res automaticamente

//router.use(ensureAdmin); se ficasse aqui, todas as middlewares abaixo teriam que ser executadas com o ensureAdmin
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle) //middleware concentrado, ensureAuthentication passa antes pois primeiro deve autenticar e depois checar admin
router.get('/tags', ensureAuthenticated, listTagsController.handle)

router.post("/login", authenticateUserController.handle)

router.post('/compliments', ensureAuthenticated ,createComplimentController.handle)

router.get('/users/compliments/send', ensureAuthenticated, listUserSendComplimentController.handle)
router.get('/users/compliments/receive', ensureAuthenticated, listUserReceiveComplimentController.handle)

router.get('/users', ensureAdmin, listUsersController.handle)

export { router };



// post(req.body) => CreateUserController => CreateUserService => UsersRepositories => User => sqlite table 'users' (created by migration CreateUser)
// post(req.body) recebe a requisição e informação do usuário no client localhost:3000/users e passa para o CreateUserController
// CreateUserController recebe a requisição de post/users e envia eles para o CreateUserService
// CreateUserService recebe os dados, faz as validações e insere o usuario na database acessando UsersRepositories
// UsersRepositories cria uma acessa a entidade User e dispõe todos os metodos de acesso ao banco de dados 
// User referencia a tabela "users" fazendo uma "tradução" da tabela em uma classe User
// tabela "users" que foi criada pela migration CreateUser no banco de dados
// CreateUserService faz as validações utilizando metodos do UserRepositories e inserindo por metodos de lá também, e retorna o usuario
// CreateUserController ao instanciar o service e usar o execute, recebe o user de volta pelo return e retorna esse valor com todos os dados em json
// O client recebe pelo localhost:3000/users de metodo post uma resposta que retorna um JSON com todos os dados do seu cadastro
// O client so preciso passar nome, email e admin (default: false), visto que o id, o created_at (conta criada em) e o updated_at (conta atualizada em) te, valores default
// O admin por padrao é false, o id caso nao seja passado (significando que é create e não read, update ou delete) é criado automaticamente pelo uuid (universally unique identifier)
// O created_at e o updated_at sao datas e por padrão utilizam o metodo now() para terem o valor da data e hora no momento da criação do usuário

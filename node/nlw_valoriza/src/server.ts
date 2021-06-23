import express, { Request, Response, NextFunction } from "express"; 
import "express-async-errors" //yarn add express-async-errors => forma do express reconhecer erros em funcoes async/await, precisa ser importada logo apos o express
import "reflect-metadata";
import "./database";
import {router} from "./routes";

const app = express();

app.use(express.json()); //forma de dizer ao express que estamos utilizando json
app.use(router) //forma de centralizar as rotas (app.get, app.post) em um outro arquivo e nao poluir

app.use((err: Error, req: Request, res: Response, next: NextFunction) => { //forma de tratar as excecoes do CreateUserController, pois o response enviado por la passa por aqui
    if(err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
}) //lembrar de colocar depois das rotas, pois so tem erros depois que tudo foi chamado

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000!')   
})

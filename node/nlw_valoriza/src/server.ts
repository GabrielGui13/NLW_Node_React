import express from "express"; 
import "reflect-metadata";
import "./database"
import {router} from "./routes";

const app = express();

app.use(express.json()); //forma de dizer ao express que estamos utilizando json
app.use(router) //forma de centralizar as rotas (app.get, app.post) em um outro arquivo e nao poluir

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000!')   
})

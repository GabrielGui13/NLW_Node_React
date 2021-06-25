import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    //Receber o nosso token
    const authToken = req.headers.authorization //Bearer token, authorization eh o token

    //Validar se token esta preenchido
    if (!authToken) {
        return res.status(401).end(); //mensaaem padrao do error 401
    }

    const [, token] = authToken.split(" ")

    //Validar se token eh valido
    try {
        const { sub } = verify(token, "3aed62f0f1e95d15f957f29e59906099") as IPayload; //para retornar uma string
        req.user_id = sub //deve se criar uma pasta @types/express/index.d.ts para criar um parametro de user_id
        //"typeRoots": ["./src/@types"] alterado em tsconfig para validar
        return next();
    } 
    catch(e) {
        return res.status(401).end();
    }
    
    //Recuperar informacoes do usuario

}
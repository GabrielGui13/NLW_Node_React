import { CreateTagService } from '../services/CreateTagService';
import { Request, Response } from 'express'

class CreateTagController {
    async handle(req: Request, res: Response) {
        const createTagService = new CreateTagService();
        const { name } = req.body

        const tag = await createTagService.execute(name);
        return res.json(tag);
    }
}

export { CreateTagController }
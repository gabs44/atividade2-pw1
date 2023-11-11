import {Request,Response} from 'express';
import {ServiceUser} from '../service/serviceUser';

const serviceUser = new ServiceUser()
export class ControllerUser {
  async create(req: Request, res: Response) {
    const { name, username } = req.body;
    try {
      const result = await serviceUser.create({ name, username });
      res.json(result);
    } catch (error: unknown) {
      res.status(404).json(error);
    }
  }
}
import {Request,Response} from 'express';
import {ServiceUser} from '../service/serviceUser';
import { UserError } from '../utils/errors';

const serviceUser = new ServiceUser()
export class ControllerUser {
  async create(req: Request, res: Response) {
    const { name, username } = req.body;
    try {
      const result = await serviceUser.create({ name, username });
      res.status(201).json(result);
    } catch (error: unknown) {
      if(error instanceof UserError){
        res.status(400).json({error: error.message})
      }else{
        res.status(400).json({error: 'something went wrong'})
      }
    }
  }
}
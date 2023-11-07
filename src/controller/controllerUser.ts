import {Request,Response} from 'express';
import {RegisterUser} from '../model/RegisterUser';

export class RegisterUserController {

  async handle(req:Request,res:Response){
    const {name, username} = req.body;

    const registerUser = new RegisterUser();

    const result = await registerUser.execute({name, username});
    return res.status(200).json(result);

  }
}
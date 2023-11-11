import {Request,Response,NextFunction } from 'express';
import {prisma} from '../database/repositoryClient';
import { CustomRequest } from '../interfaces/CustomRequest';

export async function checkExistsUserAccount(
  req:CustomRequest, 
  res:Response, 
  next:NextFunction,
  ){
    const { username } = req.headers as {username:string};
    const userExists = await prisma.user.findUnique({
      where:{
        username
      }
    })
    if (!userExists) {
      return res.status(404).json({ error: "User does not exists" });
    }
    req.user = userExists;
    
    return next();
}
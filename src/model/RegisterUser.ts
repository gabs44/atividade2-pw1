import {prisma} from '../database/repositoryClient';

type Params ={
  name:string;
  username:string
}
export class RegisterUser{

  async execute({name, username}:Params){

    const client = await prisma.user.findUnique({
      where:{
        username
      }
    })
    if(client !== null){
      return {message:'client já existe'}
    }
    const UserNew = await prisma.user.create({
      data:{
       name,
       username
      },
   
     });
   
     return UserNew
  }
}
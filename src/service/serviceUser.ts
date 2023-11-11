import { prisma } from "../database/repositoryClient";

type Params ={
  name:string;
  username:string
}
export class ServiceUser{
  async create ({name, username}:Params){

    const client = await prisma.user.findUnique({
      where:{
        username
      }
    })
    if(client !== null){
      throw new Error("user alredy exists")
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

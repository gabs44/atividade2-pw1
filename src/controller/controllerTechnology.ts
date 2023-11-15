import { Request, Response } from "express";
import { prisma } from "../database/repositoryClient";
import { CustomRequest } from "../interfaces/CustomRequest";
import {ServiceTechnology } from "../service/serviceTechnology";
import { User } from "@prisma/client";
import { TechnologyError } from "../utils/errors";

const serviceTechnology = new ServiceTechnology()

export class ControllerTechnology{
  async list(req: CustomRequest, res: Response){
    const user = req.user?.id!;
    try{
      const ocorrencias = await serviceTechnology.list(user);
      res.json(ocorrencias)
    }catch(error:unknown){
      res.status(404).json(error)
    }
  }async create(req: CustomRequest, res: Response){
    const {title, deadline} = req.body;
    const user = req.user!;
    try{
      const technology = await serviceTechnology.create({title, deadline, user})
      res.status(201).json(technology)
    }catch(error:unknown){
      if(error instanceof TechnologyError){
        res.status(404).json({error: error.message})
      }
      else{
        res.status(404).json({error: 'Somethigh went wrong'})
      }
    }
  }async update(req: CustomRequest, res: Response){
    const user = req.user!
    const {id} = req.params
    const {title, deadline} = req.body;
    try{
      const technology = await serviceTechnology.update({id, title, deadline, user})
      res.status(200).json(technology)
    }catch(error: unknown){
      res.status(404).json({error: "Technology not found"})
    }
  } async updateMany(req:CustomRequest, res: Response){
    const userId = req.user!.id
    const {id} = req.params
    try{
       await serviceTechnology.updateMany({userId, id})
      res.status(200).json({ message: "Technology updated successfully" })
    }catch(error: unknown){
      res.status(404).json({error: "Technology not found"})
    }
  }
  async delete(req: CustomRequest, res: Response){
    const userId = req.user!.id
    const {id} = req.params
    try{
      await serviceTechnology.delete({userId, id})
      const listUpdate = await serviceTechnology.list(userId)
      res.status(200).json({listUpdate})
    }catch(error:unknown){
      res.status(404).json({error: "Technology not found"})
    }
  }
}
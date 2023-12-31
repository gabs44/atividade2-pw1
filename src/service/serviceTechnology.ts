import { Response } from "express";
import { prisma } from "../database/repositoryClient";
import { CustomRequest } from "../interfaces/CustomRequest";
import { UUID } from "crypto";
import { User } from "@prisma/client";
import { TechnologyError } from "../utils/errors";

type Params = {
  title: string;
  deadline: Date;
  user: User;
  id?: string;
};

type ParamsUserTech = {
  userId: string;
  id: string;
};

export class ServiceTechnology {
  async list(id: string) {
    try {
      const technologies = await prisma.technology.findMany({
        where: {
          userId: id,
        },
      });
      return technologies;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  async create({ title, deadline, user }: Params) {
    try {
      const existingTechnology = await prisma.technology.findFirst({
        where: {
          title: title != undefined ? title : "",
          userId: user.id,
        },
      });
      if (existingTechnology) {
        throw new TechnologyError("Technology already exists");
      }
      const createTechnology = await prisma.technology.create({
        data: {
          title,
          studied: false,
          deadline: new Date(deadline),
          created_at: new Date(),
          User: {
            connect: { id: user.id },
          },
        },
      });
      return createTechnology;
    } catch (err) {
      if (err instanceof TechnologyError) {
        throw err;
      }
      throw new Error();
    }
  }
  async update({ id, title, deadline, user }: Params) {
    try {
      const updateTechnology = await prisma.technology.update({
        where: {
          id,
          userId: user.id,
        },
        data: {
          title,
          deadline: new Date(deadline),
        },
      });
      return updateTechnology;
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  }
  async updateMany({ userId, id }: ParamsUserTech) {
    try {
      const existingTechnology = await prisma.technology.findFirst({
        where: {
          userId: userId,
          id: id,
        },
      });
      if (!existingTechnology) {
        throw new TechnologyError("Technology does not exist");
      }
      const updateTechnology = await prisma.technology.updateMany({
        where: {
          userId: userId,
          id: id,
        },
        data: {
          studied: true,
          
        },
      });
      return updateTechnology;
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  }
  async delete({ userId, id }: ParamsUserTech) {
    try {
      const existingTechnology = await prisma.technology.findFirst({
        where: {
          userId: userId,
          id: id,
        },
      });
      if (!existingTechnology) {
        throw new TechnologyError("Technology does not exist");
      }
      const deleteTechnology = await prisma.technology.delete({
        where: {
          id,
          userId,
        },
      });
      return deleteTechnology;
    } catch (err) {
      throw err;
    }
  }
}

import {Request,Response,Router} from 'express';

import {RegisterUserController} from '../controller/controllerUser';

import {checkExistsUserAccount} from '../middlewares/checkExistsUserAccount';

import {prisma} from '../database/repositoryClient';

const routesUser = Router();

const registerClientController = new RegisterUserController();
routesUser.post('/users',registerClientController.handle);

export default routesUser
import {Request,Response,Router} from 'express';

import {checkExistsUserAccount} from '../middlewares/checkExistsUserAccount';
import {prisma} from '../database/repositoryClient';
import { ControllerUser } from '../controller/controllerUser';

const routesUser = Router();

const controllerUser = new ControllerUser()
routesUser.post('/users',controllerUser.create);

export default routesUser
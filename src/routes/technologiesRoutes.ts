import { Router} from 'express';
import {checkExistsUserAccount} from '../middlewares/checkExistsUserAccount';
import { ControllerTechnology } from '../controller/controllerTechnology';

 const routesTechnologies = Router();

 const controllerTechnology = new ControllerTechnology()
 routesTechnologies.get('/technologies', checkExistsUserAccount, controllerTechnology.list)
 routesTechnologies.post('/technologies', checkExistsUserAccount, controllerTechnology.create)
 routesTechnologies.put('/technologies/:id', checkExistsUserAccount, controllerTechnology.update)
 routesTechnologies.patch('/technologies/:id/studied', checkExistsUserAccount, controllerTechnology.updateMany)
 routesTechnologies.delete('/technologies/:id', checkExistsUserAccount, controllerTechnology.delete)

 export default routesTechnologies
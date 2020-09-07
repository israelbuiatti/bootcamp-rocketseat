import { Router } from 'express'
import SessionsController from './../controllers/SessionsController';
import { celebrate, Segments, Joi } from 'celebrate';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

const cel1 = celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    },
});

sessionsRouter.post('/', cel1, sessionsController.create)


export default sessionsRouter;

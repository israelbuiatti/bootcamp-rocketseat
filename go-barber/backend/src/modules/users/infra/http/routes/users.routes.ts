import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from './../middlewares/ensureAuthenticated';
import multer from 'multer'
import uploadConfig from '@config/upload';
import UsersController from './../controllers/UsersController';
import UserAvatarController from './../controllers/UserAvatarController';


const usersRouter = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.get('/', ensureAuthenticated, usersController.show);


const cel1 = celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }
});
usersRouter.post('/', usersController.create);


usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update);


export default usersRouter;

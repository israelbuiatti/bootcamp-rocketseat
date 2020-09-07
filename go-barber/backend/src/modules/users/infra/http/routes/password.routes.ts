import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();


const cel1 = celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required()
    }
})
passwordRouter.post('/forgot', cel1, forgotPasswordController.create);


const cel2 = celebrate({
    [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string().required().valid(Joi.ref('password'))
    }
})
passwordRouter.post('/reset', cel2, resetPasswordController.create);


export default passwordRouter;

import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);


const cel1 = celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required()
    }
})
providersRouter.get('/:provider_id/month-availability', cel1, providerMonthAvailabilityController.index);


const cel2 = celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required()
    }
})
providersRouter.get('/:provider_id/day-availability', cel2, providerDayAvailabilityController.index);

export default providersRouter;

import express from 'express';
import { body, query} from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request.js';
import { requireAuth } from '../../middlewares/auth.js';
import { Config } from '../../config/index.js';
import { getWeather } from '../../services/openWeather.js';

const router = express.Router();
const {API_PREFIX, API_VERSION} = Config
const route = `${API_PREFIX}/${API_VERSION}/weather`


router.get(
    `${route}`,
    /* [
      query('post_code')
        .isPostalCode()
        .withMessage('Postal code must be valid'),
      query('country_code')
        .trim()
        .notEmpty()
        .withMessage('You must supply a country code')
    ],
    validateRequest, */ requireAuth, getWeather);
    

export { router as Weather };

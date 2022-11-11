import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request.js';
import { loginUser } from '../../controllers/userController.js';
import { requireAuth } from '../../middlewares/auth.js';
import { Config } from '../../config/index.js';

const router = express.Router();
const {API_PREFIX, API_VERSION} = Config
const route = `${API_PREFIX}/${API_VERSION}/auth`

router.post(
    `${route}/login`,
    [
      body('email')
        .isEmail()
        .withMessage('Email must be valid'),
      body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
    ],
    validateRequest, loginUser);
    
// endpoint to get the current user and verify the token
router.get(`${route}/current-user`, requireAuth, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
  });

export { router as AuthRouter };

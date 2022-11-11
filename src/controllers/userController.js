import { BadRequestError } from '../errors/index.js';
import {signJWT} from '../middlewares/auth.js';

  export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const existingUser = email === 'test@example.com' && password === '123456'
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }
    
    const response = {
        user: {
            id: 1,
            email: email,
            name: 'Test Acc',
        },
        accessToken: '',
    }
    // Generate JWT
    const accessToken = signJWT(response.user);
    response.accessToken = accessToken;
    res.status(200).send(response);
  }
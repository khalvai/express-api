import express, { Request, Response, NextFunction, Router } from 'express';
import { AuthService } from './user.service';
import { validateRequestBody } from '../validation/validation.middelware';
import { signUpDto } from './Dto/signup.dto';
const authRouter = express.Router();
const authService: AuthService = new AuthService();

authRouter.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

authRouter.post(
  '/signup',
  validateRequestBody(signUpDto),
  authService.signUp.bind(authService),
);

export { authRouter };

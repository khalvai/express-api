import express, { Request, Response, NextFunction, Router } from 'express';
import { AuthService } from './auth.service';
import { validateRequestBody } from '../middlewares/validation.middleware';
import { SignUpDto } from './Dto/signup.dto';
import { LoginDto } from './Dto/login.dto';
const authRouter = express.Router();
const authService: AuthService = new AuthService();

authRouter.get('/', (req: Request, res: Response) => {
  res.send('hey there....');
});

authRouter.post(
  '/signup',
  validateRequestBody(SignUpDto),
  authService.signUp.bind(authService),
);
authRouter.post(
  '/login',
  validateRequestBody(LoginDto),
  authService.login.bind(authService),
);
export { authRouter };

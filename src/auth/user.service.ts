import { User } from '@prisma/client';
import { DoItSafe } from '../decorators/Doitsafe.decorator';
import { HttpException } from '../error/http-exception';
import { AuthRepository } from './auth.repository';
import { NextFunction, Request, Response } from 'express';
import { signUpDate } from './Dto/signup.dto';
import { LoginData } from './Dto/login.dto';

export class AuthService {
  private authRepository: AuthRepository = new AuthRepository();

  @DoItSafe()
  async signUp(req: Request, res: Response) {
    const sigUpDate: signUpDate = req.body;

    const user = await this.checkEmailExists(sigUpDate.email);

    const createdUser = await this.authRepository.create(sigUpDate);

    res.status(200).send(createdUser);
  }

  async checkEmailExists(email: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    console.log('in service bro');
    if (user)
      throw new HttpException('user already exists with this email', 404);

    return user;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.authRepository.findByEmail(email);
  }

  @DoItSafe()
  async login(req: Request, res: Response, next: NextFunction) {
    const loginData: LoginData = req.body;
    const user = await this.authRepository.findByEmail(loginData.email);

    if (user.password === loginData.password) {
      res.send('welcome to your world :)').status(200);
    }
  }
}

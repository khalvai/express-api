import { User } from '@prisma/client';
import { DoItSafe } from '../decorators/Doitsafe.decorator';
import { HttpException } from '../error/http-exception';
import { AuthRepository } from './auth.repository';
import { NextFunction, Request, Response } from 'express';
import { SignUpData } from './Dto/signup.dto';
import { LoginData } from './Dto/login.dto';
import { Hash } from '../common/hash';

export class AuthService {
  private authRepository: AuthRepository = new AuthRepository();
  private hash: Hash = new Hash();
  @DoItSafe()
  async signUp(req: Request, res: Response) {
    const { password, ...signUpData }: SignUpData = req.body;

    const user = await this.checkEmailExists(signUpData.email);
    const hashedPassword = await Hash.hash(password);
    const createdUser = await this.authRepository.create({
      ...signUpData,
      password: hashedPassword,
    });

    res.status(200).send(createdUser);
  }

  async checkEmailExists(email: string): Promise<User | null> {
    const user = await this.findByEmail(email);
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
    const isMatched = await Hash.compare(loginData.password, user.password);

    if (!isMatched) {
      throw new HttpException('wrong credentials :)', 400);
    }

    res.send('welcome to your world :)').status(200);
  }



  
}

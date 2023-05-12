import { User } from '@prisma/client';
import { DoItSafe } from '../decorators/Doitsafe.decorator';
import { HttpException } from '../error/http-exception';
import { AuthRepository } from './auth.repository';
import { Request, Response } from 'express';
import { signUpDate } from './Dto/signup.dto';

export class AuthService {
  private authRepository: AuthRepository = new AuthRepository();

  async findByEmail(email: string): Promise<User | null> {
    console.log('in service bro');

    return this.authRepository.findByEmail(email);
  }


  @DoItSafe()
  async signUp(req: Request, res: Response) {
    const sigUpDate: signUpDate = req.body;

    const user = await this.findByEmail(sigUpDate.email);

    if (user)
      throw new HttpException('user already exists with this email', 404);

    const createdUser = await this.authRepository.create(sigUpDate);

    res.status(200).send(createdUser);
  }
}

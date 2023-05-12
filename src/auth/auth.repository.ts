import { User } from '@prisma/client';
import prisma from '../prisma';
import { SignUpData } from './Dto/signup.dto';

export class AuthRepository {
  async create(createUserData: SignUpData) {
    return prisma.user.create({
      data: {
        ...createUserData,
        status: 'not',
        isVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    console.log('in repo bro');

    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}

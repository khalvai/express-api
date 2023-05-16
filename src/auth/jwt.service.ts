import jwt from 'jsonwebtoken';
import { JwtPayload } from '../common/jwt.payload';

export class JwtService {
  private readonly jwtSecretKey: string = process.env.JWT_SECRET;

  getAccessToken(jwtPayload: JwtPayload): string {
    return jwt.sign(jwtPayload, process.env.JWT_SECRET);
  }

  verify (accessToken :string) {
    return jwt.verify(accessToken,process.env.JWT_SECRET)
  }
}

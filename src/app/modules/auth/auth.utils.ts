import { TJwtPawload } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
export const createAccessToken = (jwtPayload: TJwtPawload, secret: string) => {
  return jwt.sign(jwtPayload, secret, { expiresIn: '7d' });
};
export const createRefreshToken = (jwtPayload: TJwtPawload, secret: string) => {
  return jwt.sign(jwtPayload, secret, { expiresIn: '365d' });
};
export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

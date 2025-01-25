import { TJwtPawload } from './auth.interface';
import jwt from 'jsonwebtoken';
export const createAccessToken = (jwtPayload: TJwtPawload, secret: string) => {
  return jwt.sign(jwtPayload, secret, { expiresIn: '1d' });
};
export const createRefreshToken = (jwtPayload: TJwtPawload, secret: string) => {
  return jwt.sign(jwtPayload, secret, { expiresIn: '20d' });
};

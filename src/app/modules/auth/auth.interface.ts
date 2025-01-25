import { ObjectId } from 'mongoose';

export type TLoginUser = {
  email: string;
  password: string;
};
export type TJwtPawload = {
  _id: ObjectId;
  userEmail: string;
  role: string;
};

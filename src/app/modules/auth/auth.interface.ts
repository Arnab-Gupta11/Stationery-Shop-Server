import { ObjectId } from 'mongoose';

export type TLoginUser = {
  email: string;
  password: string;
};
export type TJwtPawload = {
  userId: ObjectId;
  userEmail: string;
  role: string;
  profilePicture:string
};

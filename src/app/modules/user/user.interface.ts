/* eslint-disable no-unused-vars */
import { Model, ObjectId } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  _id: ObjectId;
  fullName: string;
  profilePicture: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  phone?: string;
  address?: string;
  city?: string;
  isBlocked: boolean;
}

//Interface for Static method.
export interface UserModel extends Model<IUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(id: string): Promise<IUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

//Interface for user role
export type TUserRole = keyof typeof USER_ROLE;

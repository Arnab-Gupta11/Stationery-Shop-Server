// import { config } from '../../config';
import { config } from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

import { TLoginUser } from './auth.interface';
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from './auth.utils';

//Register User
/* ---------> Create a new user. <----------- */
const registerUserIntoDB = async (payload: Record<string, string>) => {
  const { fullName, email, password, confirmedPassword } = payload;
  // Check if all required fields are provided
  if (!fullName || !email || !password || !confirmedPassword) {
    throw new AppError(
      400,
      'All fields (Full Name, Email, Password, Confirmed Password) are required.',
    );
  }

  // Check if password and password_confirmation match
  if (password !== confirmedPassword) {
    throw new AppError(
      400,
      'Passwords do not match. Please ensure both password fields are identical.',
    );
  }

  //Check if User is already exist
  const doesEmailExist = await User.exists({ email });
  if (doesEmailExist) {
    throw new AppError(
      400,
      'A user with this email already exists. Please try logging in or use a different email.',
    );
  }

  //Create a User
  const user = {
    fullName,
    email,
    password,
    profilePicture: `https://avatar.iran.liara.run/username?username=${fullName}&bold=false&length=1`,
  };
  //Register user into DB
  const newRegisterUser = await User.create(user);

  //Send Response.
  const response = {
    userId: newRegisterUser._id,
    email,
    fullName,
    role: newRegisterUser.role,
  };
  return response;
};

//Login User
const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;
  // Validate that email and password are provided
  if (!email || !password) {
    throw new AppError(400, 'Email and password are required.');
  }
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(
      401,
      'No account found with this email address. Please sign up or log in using a different email.',
    );
  }

  // checking if the user is blocked

  const userStatus = user?.isBlocked;

  if (userStatus === true) {
    throw new AppError(403, 'This user is blocked ! !');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(401, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    name: user.fullName,
    userId: user._id,
    userEmail: user.email,
    role: user.role,
    profilePicture: user.profilePicture,
    city: user.city,
    phone: user.phone,
    address: user.address,
  };

  const accessToken = createAccessToken(
    jwtPayload,
    config.jwt_access_secret as string,
  );

  const refreshToken = createRefreshToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userId } = decoded;

  // checking if the user is exist
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, 'This user is not found !');
  }

  // checking if the user is blocked

  if (user.isBlocked) {
    throw new AppError(403, 'This user is blocked ! !');
  }

  const jwtPayload = {
    userId: user._id,
    userEmail: user.email,
    role: user.role,
    profilePicture: user.profilePicture,
  };

  const accessToken = createAccessToken(
    jwtPayload,
    config.jwt_access_secret as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  registerUserIntoDB,
  loginUser,
  refreshToken,
};

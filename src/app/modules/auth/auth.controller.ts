import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import { config } from '../../config';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

//Login User
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, refreshToken } = result;
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.node_env === 'production',
    maxAge: 365 * 24 * 60 * 60,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: {
      token: accessToken,
    },
  });
});

//Logout controller.
const logout = catchAsync(async (req: Request, res: Response) => {
  // Check if the refresh token cookie exists
  if (!req.cookies?.refreshToken) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'No active session found to log out.',
      data: {},
    });
  }

  // Clear the refresh token cookie
  res.clearCookie('refreshToken');

  // Respond with a success message
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logged out successfully.',
    data: {},
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
  logout,
};

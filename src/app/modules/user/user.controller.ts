import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUserById(req.params.id,req.user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetch User details successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetch All User successfully',
    data: result,
  });
});

const updateUserInfo = catchAsync(async (req: Request, res: Response) => {
  const updatedUser = await UserServices.updateUser(req.params.id, req.body,req.user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Data Updated successfully',
    data: updatedUser,
  });
});
export const UserController = {
  getSingleUser,
  getAllUsers,
  updateUserInfo,
};

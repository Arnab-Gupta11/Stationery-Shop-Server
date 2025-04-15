import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUserById(req.params.id, req.user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetch User details successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsers(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetch All User successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateUserInfo = catchAsync(async (req: Request, res: Response) => {
  const updatedUser = await UserServices.updateUser(
    req.params.id,
    req.body,
    req.user,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User status updated successfully',
    data: updatedUser,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const updates = req.body;
  const { id } = req.params;
  const result = await UserServices.updateUserStatusIntoDB(id, updates);
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'User Status updated successfully',
      statusCode: 200,
      data: result,
    });
  }
});
export const UserController = {
  getSingleUser,
  getAllUsers,
  updateUserInfo,
  updateUserStatus,
};

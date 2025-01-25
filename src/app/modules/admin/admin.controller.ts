import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';

const BlockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await AdminServices.BlockUserIntoDB(userId);
  if (result) {
    res.status(200).json({
      success: true,
      message: 'User blocked successfully',
      statusCode: 200,
    });
  }
});
//Delete a blog
// const deleteBlogByAdmin = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await AdminServices.deleteBlogFromDbByAdmin(id);
//   if (result) {
//     res.status(200).json({
//       success: true,
//       message: 'Blog deleted successfully',
//       statusCode: 200,
//     });
//   }
// });
export const AdminControllers = {
  BlockUser,
  // deleteBlogByAdmin,
};

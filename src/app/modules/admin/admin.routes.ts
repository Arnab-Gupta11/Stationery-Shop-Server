import { Router } from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../middlewares/auth';

const router = Router();

router
  .route('/users/:userId/block')
  .patch(auth('admin'), AdminControllers.BlockUser);
// router
//   .route('/blogs/:id')
//   .delete(auth('admin'), AdminControllers.deleteBlogByAdmin);

export const AdminRoutes = router;

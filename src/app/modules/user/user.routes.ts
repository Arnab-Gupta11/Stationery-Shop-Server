import express from 'express';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/:id', auth('user'), UserController.getSingleUser);
router.get('/', auth('admin'), UserController.getAllUsers);
router.put('/:id', auth('admin', 'user'), UserController.updateUserInfo);
router.put('/userStatus/:id', auth('admin'), UserController.updateUserInfo);

export const UserRoutes = router;

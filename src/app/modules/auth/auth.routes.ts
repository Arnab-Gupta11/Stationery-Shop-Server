import { Router } from 'express';
import { AuthControllers } from './auth.controller';

import { AuthValidation } from './auth.validation';
import { UserValidations } from '../user/user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router
  .route('/register')
  .post(
    validateRequest(UserValidations.createUserValidationSchema),
    AuthControllers.registerUser,
  );
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);
router.post('/refresh-token', AuthControllers.refreshToken);
router.post('/logout', AuthControllers.logout);
export const AuthRoutes = router;

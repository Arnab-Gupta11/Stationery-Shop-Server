import { Router } from 'express';
import auth from '../../middlewares/auth';
import { FavouriteControllers } from './favourite.controller';

const router = Router();

router
  .route('/')
  .post(auth('user'), FavouriteControllers.addToFavourite)
  .delete(auth('user'), FavouriteControllers.removeFromFavourite).get(auth('user',));

export const FavouriteRoutes = router;

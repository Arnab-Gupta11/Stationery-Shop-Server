import { Router } from 'express';
import auth from '../../middlewares/auth';
import { MetaControllers } from './meta.controller';

const router = Router();

router.get('/', auth('admin', 'user'), MetaControllers.getMetaData);

export const MetaRoutes = router;

import express from 'express';

import auth from '../../middlewares/auth';
import { ContactControllers } from './contact.controller';

const router = express.Router();

router.post('/', ContactControllers.createContact);
router.get('/', auth('admin'), ContactControllers.getAllContacts);
router.get('/:id', ContactControllers.getSingleContact);

export const ContactRoutes = router;

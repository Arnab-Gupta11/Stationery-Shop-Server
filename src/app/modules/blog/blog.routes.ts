import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';
import { BlogControllers } from './blog.controller';
import auth from '../../middlewares/auth';

const router = Router();

router
  .route('/')
  .post(
    auth('admin'),
    validateRequest(BlogValidations.createBlogValidationSchema),
    BlogControllers.createBlog,
  )
  .get(BlogControllers.getAllBlogs);
router.get('/featured', BlogControllers.getAllFeturedblogs);
router
  .route('/:id')
  .patch(
    auth('admin'),
    validateRequest(BlogValidations.updateBlogValidationSchema),
    BlogControllers.updateBlog,
  )
  .delete(auth('admin'), BlogControllers.deleteBlog)
  .get(BlogControllers.getSingleBlog);

router.patch('/status/:id', auth('admin'), BlogControllers.updateBlogStatus);

export const BlogRoutes = router;

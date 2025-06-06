import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { OrderRoutes } from '../modules/order/order.routes';
import { ProductRoutes } from '../modules/product/product.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { ReviewRoute } from '../modules/review/review.routes';
import { FavouriteRoutes } from '../modules/fovourite/favourite.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { BrandRoutes } from '../modules/brand/brand.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { MetaRoutes } from '../modules/meta/meta.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/brands',
    route: BrandRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/review',
    route: ReviewRoute,
  },
  {
    path: '/favourite',
    route: FavouriteRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/meta',
    route: MetaRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

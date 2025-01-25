import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { OrderRoutes } from '../modules/order/order.routes';
import { ProductRoutes } from '../modules/product/product.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
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
    path: '/admin',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

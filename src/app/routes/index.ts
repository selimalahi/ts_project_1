import { Router } from 'express';
import { UserRoutes } from '../../modules/user/user.route';
import { StudentRoutes } from '../../modules/student/student.route';

const router = Router();

const moduleroutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/students',
        route: StudentRoutes,
    }
]

moduleroutes.forEach((route) => router.use(route.path, route.route))

export default router;

import { Router } from 'express';
import { UserRoutes } from '../../modules/user/user.route';
import { StudentRoutes } from '../../modules/student/student.route';
import { AcademicSemisterRoutes } from '../../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoute } from './../../modules/academicFaculty/academicFaculty.route';
import { AcademiDepartmentRoutes } from '../../modules/academicDepartment/academicDepartment.route';

const router = Router();

const moduleroutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemisterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-departments',
    route: AcademiDepartmentRoutes,
  },
];

moduleroutes.forEach((route) => router.use(route.path, route.route));

export default router;

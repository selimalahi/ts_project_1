import express from 'express';
import { UserControllers } from './user.controller';
import { createStudentValidationSchema } from '../student/student.valitation';
import validateRequest from '../../app/middleware/validataRequest';
// import { studentValidations } from '../student/student.valitation';
// import { studentValidationSchema } from '../student/student.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;

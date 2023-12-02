import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../app/middleware/validataRequest';
import { AcademicSemesterValidations } from './academicSemesTer.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidations.createAcademicSemesterValidation),
  AcademicSemesterControllers.createAcademicSemester,
);

export const AcademicSemisterRoutes = router;

import express from 'express';
import validateRequest from '../../app/middleware/validataRequest';
import { AcademicDepartmentValidation } from './acdemicDepartment.validation';
import { AcademicDepartmentConreollers } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-academic-department',
  // validateRequest(
  //   AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  // ),
  AcademicDepartmentConreollers.createAcademicDepartment,
);

router.get(
  '/:departmentId',
  AcademicDepartmentConreollers.getSingleAcademicDepartment
);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentConreollers.updateAcademicDepartment,
);

router.get('/', AcademicDepartmentConreollers.getAllAcademicDepartment);


export const AcademiDepartmentRoutes = router;
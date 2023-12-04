import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../app/middleware/validataRequest';
import { updateStudentValidationSchema } from './student.valitation';

const router = express.Router();



router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudent);
router.patch('/:studentId', 
validateRequest(updateStudentValidationSchema),
StudentController.updateStudent);
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;

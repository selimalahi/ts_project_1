import { UserServices } from './user.service';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  
  const result = await UserServices.cretateStudentIntoDB(password, studentData);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is crested successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};

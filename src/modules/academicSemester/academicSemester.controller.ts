import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is crested successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};

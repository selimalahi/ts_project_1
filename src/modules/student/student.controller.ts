/* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';


const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  // res.status(200).json({
  //   success: true,
  //   message: 'student is retrieved succcessfully',
  //   data: result,
  // })
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is crested successfully',
    data: result,
  });
});

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is crested successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {

    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is crested successfully',
      data: result,
    });
  
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};

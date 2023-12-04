/* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';


const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  
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
      message: 'Student is Deleted successfully',
      data: result,
    });
  
});

const updateStudent = catchAsync(async (req, res) => {

    const { studentId } = req.params;
    const {student} = req.body;
    const result = await StudentServices.updatedStudentIntoDB(studentId, student);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is Update successfully',
      data: result,
    });
  
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};

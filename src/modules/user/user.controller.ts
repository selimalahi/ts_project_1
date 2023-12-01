import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;

    // const zodparsedData = studentValidationSchema.parse(studentData);
    const result = await UserServices.cretateStudentIntoDB(
      password,
      studentData,
    );

    // res.status(200).json({
    //   success: true,
    //   message: 'Student is crested successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is crested successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};

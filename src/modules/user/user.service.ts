import mongoose from 'mongoose';
import config from '../../app/config';
import { AcademicSemesTer } from '../academicSemester/acedemicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatStudentId } from './user.utils';
import AppError from '../../app/errors/AppErrors';
import httpStatus from 'http-status';

const cretateStudentIntoDB = async (password: string, payLoad: TStudent) => {
  const userData: Partial<TUser> = {};
  // if password is not given, use default password
  userData.password = password || (config.default_password as string);
  // set student role
  userData.role = 'student';
  // find academic semester info
  const admissionSemester = await AcademicSemesTer.findById(
    payLoad.admissionSemester,
  );
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // set manually generated id
    userData.id = await generatStudentId(admissionSemester);
    // create a user (transaction-1)

    const newUser = await User.create([userData], { session });

    //create a student

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id, _id as user
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id; // refference _id

    // create a user (transaction-1)
    const newStudent = await Student.create([payLoad], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  cretateStudentIntoDB,
};

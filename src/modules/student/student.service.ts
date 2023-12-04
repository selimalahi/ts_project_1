import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../app/errors/AppErrors';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentsFromDb = async () => {
  const result = await Student.find().populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: 'academicFaculty',
  });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.aggregate([{ $match: { id: id } }]);

  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: 'academicFaculty',
    });
  return result;
};

const updatedStudentIntoDB = async (id: string, payLoad: Partial<TStudent>) => {
  const { name,guardian,  localGuardian, ...remainingStudentData } = payLoad;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdateData);

  const result = await Student.findOneAndUpdate({ id },
   modifiedUpdateData,
   {
    new: true,
   runValidators: true
  }
   
   );
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete Student');
    }

    const deleteuser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteuser) {
      throw new AppError(httpStatus.BAD_REQUEST, ' Failed To delete User');
    }

    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to Create Student');
  }
};

export const StudentServices = {
  getAllStudentsFromDb,
  getSingleStudentFromDB,
  updatedStudentIntoDB,
  deleteSingleStudentFromDB,
};

import httpStatus from 'http-status';
import AppError from '../../app/errors/AppErrors';
import { TAcademicSemester } from './academicSemester.interface';
import { academicSemesterNameCodeMapper } from './acedemicSemester.constant';
import { AcademicSemesTer } from './acedemicSemester.model';

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
  
  if (academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code) {
    throw new AppError(httpStatus.NOT_FOUND,'Invalid Semester code');
  }
   
  const result = await AcademicSemesTer.create(payLoad);
  return result;
};


const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemesTer.find();
  return result;
};



const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemesTer.findById(id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND,'Invalid Semester Code');
  }

  const result = await AcademicSemesTer.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
};

import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartmodel.model';


const createAcademicDepartmentIntoDB = async (payLoad: TAcademicDepartment) => {
  const result = AcademicDepartment.create(payLoad);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = AcademicDepartment.find().populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};

const updateAcademicFacultyDepartmentIntoDB = async (
  id: string,
  payLoad: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payLoad,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartMentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicFacultyDepartmentIntoDB,
};

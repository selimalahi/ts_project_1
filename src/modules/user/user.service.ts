import config from '../../app/config';
import { AcademicSemesTer } from '../academicSemester/acedemicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatStudentId } from './user.utils';

const cretateStudentIntoDB = async (
  password: string,
  payLoad: TStudent,
) => {
  const userData: Partial<TUser> = {};
  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

 

  // find academic semester info
  const admissionSemester = await AcademicSemesTer.findById(payLoad.admissionSemester);
  
  // set manually generated id
  userData.id = await generatStudentId(admissionSemester);

  // create a user
  const newUser = await User.create(userData);

  //create a student

  if (Object.keys(newUser).length) {
    // set id, _id as user
    payLoad.id = newUser.id;
    payLoad.user = newUser._id; // refference _id

    const newStudent = await Student.create(payLoad);
    return newStudent;
  }
};

export const UserServices = {
  cretateStudentIntoDB,
};

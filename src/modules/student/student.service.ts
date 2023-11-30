import { TStudent } from './student.interface';
import { Student } from './student.model';

const cretateStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exits');
  }
  const result = await Student.create(studentData);

  //  const student = new Student(studentData);
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('user already exists');
  // }
  // const result = await student.save(); // built in intance method
  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  cretateStudentIntoDB,
  getAllStudentsFromDb,
  getSingleStudentFromDB,
};

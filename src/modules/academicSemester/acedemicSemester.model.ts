import { Schema, model } from 'mongoose';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './acedemicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';


const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: AcademicSemesterName,
  },
  year: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: AcademicSemesterCode,
  },
  startMonth: {
    type: String,
    required: true,
    enum: Months,
  },
  endMonth: {
    type: String,
    required: true,
    enum: Months,
  },
});

export const AcademicSemesTer = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);

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

export type TAcademicSemesterNameCodeMapper = {
  [key: string]: string;
};

academicSemesterSchema.pre('save', async function(next){
const isSemesterExists = await AcademicSemesTer.findOne({
  year: this.year,
  name: this.name,
})
if(isSemesterExists){
  throw new Error('Semester is already exists !!')
}
next()
})

export const AcademicSemesTer = model<TAcademicSemester>(
  'AcademicSemester',academicSemesterSchema,
);

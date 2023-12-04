import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be string',
      required_error: 'Name is requried',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty  must be string',
      required_error: 'faculty id requried',
    }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
      name: z.string({
        invalid_type_error: 'Academic Department must be string',
        required_error: 'Name is requried',
      }).optional(),
      academicFaculty: z.string({
        invalid_type_error: 'Academic Faculty  must be string',
        required_error: 'faculty id requried',
      }).optional(),
    }),
  });


  export const AcademicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema,
  }
import { z } from "zod";

const userNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20),     
    middleName: z.string().optional(),
    lastName: z.string().min(1),      
    
  });
  
  const guardianValidationSchema = z.object({
    fatherName: z.string().min(1, { message: 'Father name is required' }),
    fatherOccupation: z.string().min(1, { message: 'Father occupation is required' }),
    fatherContactNo: z.string().min(1, { message: 'Father contact number is required' }),
    motherName: z.string().min(1, { message: 'Mother name is required' }),
    motherOccupation: z.string().min(1, { message: 'Mother occupation is required' }),
    motherContactNo: z.string().min(1, { message: 'Mother contact number is required' }),
  });
  
  const localGuardianValidationSchema = z.object({
    name: z.string().min(1, { message: 'Local guardian name is required' }),
    occupation: z.string().min(1, { message: 'Local guardian occupation is required' }),
    contactNo: z.string().min(1, { message: 'Local guardian contact number is required' }),
    address: z.string().min(1, { message: 'Local guardian address is required' }),
  });
  
  const studentValidationSchema = z.object({
    id: z.string(),
    password: z.string().max(20),
    name:  userNameValidationSchema,
    gender: z.enum(['male', 'female', 'other']).refine(value => typeof value === 'string', { message: 'Gender is required' }),
    dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    contactNo: z.string().min(1, { message: 'Contact number is required' }),
    emergencyContactNo: z.string().min(1, { message: 'Emergency contact number is required' }),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    presentaddress: z.string().min(1, { message: 'Present address is required' }),
    permanentAddress: z.string().min(1, { message: 'Permanent address is required' }),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(['active', 'block']).default('active'),
    isDeleted: z.boolean(),
  });


  export default studentValidationSchema;
  
import Joi from "joi";

const userNameSchema = Joi.object({
    firstName: Joi.string()
      .required()
      .max(20)
      .regex(/^[A-Z][a-z]*$/)
      .message('First name must start with a capital letter and contain only letters'),
    middleName: Joi.string().trim(),
    lastName: Joi.string()
      .required()
      .regex(/^[a-zA-Z]+$/)
      .message('Last name must contain only letters'),
  });
  
  const guardianSchema = Joi.object({
    fatherName: Joi.string().required().trim(),
    fatherOccupation: Joi.string().required().trim(),
    fatherContactNo: Joi.string().required().trim(),
    motherName: Joi.string().required().trim(),
    motherOccupation: Joi.string().required().trim(),
    motherContactNo: Joi.string().required().trim(),
  });
  
  const localGuardianSchema = Joi.object({
    name: Joi.string().required().trim(),
    occupation: Joi.string().required().trim(),
    contactNo: Joi.string().required().trim(),
    address: Joi.string().required().trim(),
  });
  
  const studentSchema = Joi.object({
    id: Joi.string().required().trim(),
    name: userNameSchema.required(),
    gender: Joi.string().valid('male', 'female', 'other').required().trim(),
    dateOfBirth: Joi.string().required().trim(),
    email: Joi.string().email().required().trim(),
    contactNo: Joi.string().required().trim(),
    emergencyContactNo: Joi.string().required().trim(),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').trim(),
    presentaddress: Joi.string().required().trim(),
    permanentAddress: Joi.string().required().trim(),
    guardian: guardianSchema.required(),
    localGuardian: localGuardianSchema.required(),
    profileImg: Joi.string(),
    isActive: Joi.string().valid('active', 'block').default('active'),
  });

  export default studentSchema;

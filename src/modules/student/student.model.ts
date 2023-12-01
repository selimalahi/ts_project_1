/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUsername,
} from './student.interface';
const userNameSchema = new Schema<TUsername>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'FirstName can not be more than  allowed length is 20'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contacNO is required'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contacNO is required'],
    trim: true,
  },
});

const localGuardinSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'localGuradian name is required'],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'localGuradian occupation is required'],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'localGuradian contacNO is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'localGuradian address is required'],
    trim: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, ' id is requried'],
      unique: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is requried'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid',
      },
      required: true,
      trim: true,
    },
    dateOfBirth: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    contactNo: { type: String, required: true, trim: true },
    emergencyContactNo: { type: String, required: true, trim: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      trim: true,
    },
    presentaddress: { type: String, required: true, trim: true },
    permanentAddress: { type: String, required: true, trim: true },
    guardian: {
      type: guardianSchema,
      required: true,
      trim: true,
    },
    localGuardian: {
      type: localGuardinSchema,
      required: true,
      trim: true,
    },
    profileImg: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName}, ${this.name.lastName}`;
});

// create inastance method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//Query middleware

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Student = model<TStudent, StudentModel>('Student', studentSchema);

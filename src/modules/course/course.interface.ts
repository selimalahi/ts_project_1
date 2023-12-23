// import { Types } from "mongoose";


// export type TPreRequisiteCourse = {
//     course: Types.ObjectId;
//     isDeleted: boolean;
// }

// export type TCourse ={
//     title: string;
//     prefix: string;
//     code: number;
//     credits: number;
//     preRequisiteCourse: [];
// }


import { Types } from 'mongoose';

export type TPreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?: boolean;
  preRequisiteCourses: [TPreRequisiteCourses];
};

export type TCoursefaculty = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
// import Joi from 'joi';
import { StudentServices } from './student.service';
// import studentSchema from './student.validiator';
import { z } from "zod";
import studentValidationSchema from './student.valitation';

const createStudent = async (req: Request, res: Response) => {
  try { 


    const { student: studentData } = req.body;   
     //data validation using joi
  //  const {error, value} = studentSchema.validate(studentData);
    //  const result = await StudentServices.cretateStudentIntoDB(value);

    const zodparsedData = studentValidationSchema.parse(studentData)

   const result = await StudentServices.cretateStudentIntoDB(zodparsedData);
    
  //  if(error){
  //   res.status(500).json({
  //     success: false,
  //     message: 'something went wrong',
  //     error:error.details,
  //   })
  //  }    

    res.status(200).json({
      success: true,
      message: 'Student is crested successfully',
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb()

    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getSingleStudent = async(req: Request, res: Response)=>{
  try{
    const {studentId} = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'student is retrieved succcessfully',
      data: result,
    })
  } catch(err: any ){
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) =>{
  try{
   const{studentId} = req.params;
   const result = await StudentServices.deleteSingleStudentFromDB(studentId)
   
   res.status(200).json({
    success: true,
    message: 'student is delete successfully',
    data: result
   })

  }catch(err: any)
  {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });

  }
}

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};

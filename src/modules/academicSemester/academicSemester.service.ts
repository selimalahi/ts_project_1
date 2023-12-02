import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesTer } from "./acedemicSemester.model";


const createAcademicSemesterIntoDB = async(payLoad: TAcademicSemester,) =>{

    const result = await AcademicSemesTer.create(payLoad);
    return result;

}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
}
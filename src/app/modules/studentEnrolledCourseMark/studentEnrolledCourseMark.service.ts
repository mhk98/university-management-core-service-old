import { ExamType, PrismaClient } from "@prisma/client";
import { DefaultArgs, PrismaClientOptions } from "@prisma/client/runtime/library";

const createStudentEnrolledCourseDefaultMark = async (

    prismaClient: Omit<PrismaClient<PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">,
    payload: {
        studentId: string,
        studentEnrolledCourseId: string,
        academicSemesterId: string
    }
) =>{
    console.log( payload);
    const isExistMidtermData = await prismaClient.studentEnrolledCourseMark.findFirst({
        where:{
            examType: ExamType.MIDTERM,
            
            student: {
                id: payload.studentId,
            },
            studentEnrolledCourse: {
                id:payload.studentEnrolledCourseId
            },
            academicSemester:{
                id: payload.academicSemesterId
            }
        },
        
    })
    

    if(!isExistMidtermData){
        await prismaClient.studentEnrolledCourseMark.create({
            data: {
                student: {
                    connect: {
                        id:payload.studentId
                    }
                },
    
                studentEnrolledCourse: {
                    connect: {
                        id:payload.studentEnrolledCourseId
                    }
                },
                academicSemester: {
                    connect: {
                        id:payload.academicSemesterId
                    }
                },
    
                examType: ExamType.MIDTERM
            }
        })
    }


    const isExistFinalData = await prismaClient.studentEnrolledCourseMark.findFirst({
        where:{
            examType: ExamType.FINAL,
            
            student: {
                id: payload.studentId,
            },
            studentEnrolledCourse: {
                id:payload.studentEnrolledCourseId
            },
            academicSemester:{
                id: payload.academicSemesterId
            }
        },
        
    })

    if(!isExistFinalData){
        await prismaClient.studentEnrolledCourseMark.create({
            data: {
                student: {
                    connect: {
                        id:payload.studentId
                    }
                },
    
                studentEnrolledCourse: {
                    connect: {
                        id:payload.studentEnrolledCourseId
                    }
                },
                academicSemester: {
                    connect: {
                        id:payload.academicSemesterId
                    }
                },
    
                examType: ExamType.FINAL
            }
        })
    }

    
}


export const StudentEnrolledCourseMarkService = {
    createStudentEnrolledCourseDefaultMark
}
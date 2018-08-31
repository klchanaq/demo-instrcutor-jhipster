import { IInstructordetail } from 'app/shared/model//instructordetail.model';
import { ICourse } from 'app/shared/model//course.model';

export interface IInstructor {
    id?: number;
    name?: string;
    email?: string;
    instructordetail?: IInstructordetail;
    courses?: ICourse[];
}

export class Instructor implements IInstructor {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public instructordetail?: IInstructordetail,
        public courses?: ICourse[]
    ) {}
}

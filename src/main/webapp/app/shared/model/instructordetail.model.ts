import { IInstructor } from 'app/shared/model//instructor.model';

export interface IInstructordetail {
    id?: number;
    youtubeChannel?: string;
    hobby?: string;
    instructor?: IInstructor;
}

export class Instructordetail implements IInstructordetail {
    constructor(public id?: number, public youtubeChannel?: string, public hobby?: string, public instructor?: IInstructor) {}
}

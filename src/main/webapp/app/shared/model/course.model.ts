import { IInstructor } from 'app/shared/model//instructor.model';
import { IReview } from 'app/shared/model//review.model';
import { IStudent } from 'app/shared/model//student.model';

export interface ICourse {
    id?: number;
    title?: string;
    instructor?: IInstructor;
    reviews?: IReview[];
    students?: IStudent[];
}

export class Course implements ICourse {
    constructor(
        public id?: number,
        public title?: string,
        public instructor?: IInstructor,
        public reviews?: IReview[],
        public students?: IStudent[]
    ) {}
}

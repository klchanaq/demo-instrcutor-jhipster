import { ICourse } from 'app/shared/model//course.model';

export interface IReview {
    id?: number;
    comment?: string;
    course?: ICourse;
}

export class Review implements IReview {
    constructor(public id?: number, public comment?: string, public course?: ICourse) {}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInstructor } from 'app/shared/model/instructor.model';

@Component({
    selector: 'jhi-instructor-detail',
    templateUrl: './instructor-detail.component.html'
})
export class InstructorDetailComponent implements OnInit {
    instructor: IInstructor;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ instructor }) => {
            this.instructor = instructor;
        });
    }

    previousState() {
        window.history.back();
    }
}

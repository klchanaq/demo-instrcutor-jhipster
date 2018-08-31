import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInstructordetail } from 'app/shared/model/instructordetail.model';

@Component({
    selector: 'jhi-instructordetail-detail',
    templateUrl: './instructordetail-detail.component.html'
})
export class InstructordetailDetailComponent implements OnInit {
    instructordetail: IInstructordetail;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ instructordetail }) => {
            this.instructordetail = instructordetail;
        });
    }

    previousState() {
        window.history.back();
    }
}

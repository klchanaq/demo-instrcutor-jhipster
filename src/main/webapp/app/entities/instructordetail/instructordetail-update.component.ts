import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IInstructordetail } from 'app/shared/model/instructordetail.model';
import { InstructordetailService } from './instructordetail.service';
import { IInstructor } from 'app/shared/model/instructor.model';
import { InstructorService } from 'app/entities/instructor';

@Component({
    selector: 'jhi-instructordetail-update',
    templateUrl: './instructordetail-update.component.html'
})
export class InstructordetailUpdateComponent implements OnInit {
    private _instructordetail: IInstructordetail;
    isSaving: boolean;

    instructors: IInstructor[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private instructordetailService: InstructordetailService,
        private instructorService: InstructorService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ instructordetail }) => {
            this.instructordetail = instructordetail;
        });
        this.instructorService.query().subscribe(
            (res: HttpResponse<IInstructor[]>) => {
                this.instructors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.instructordetail.id !== undefined) {
            this.subscribeToSaveResponse(this.instructordetailService.update(this.instructordetail));
        } else {
            this.subscribeToSaveResponse(this.instructordetailService.create(this.instructordetail));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInstructordetail>>) {
        result.subscribe((res: HttpResponse<IInstructordetail>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackInstructorById(index: number, item: IInstructor) {
        return item.id;
    }
    get instructordetail() {
        return this._instructordetail;
    }

    set instructordetail(instructordetail: IInstructordetail) {
        this._instructordetail = instructordetail;
    }
}

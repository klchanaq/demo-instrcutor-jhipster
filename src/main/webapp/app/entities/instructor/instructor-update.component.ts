import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IInstructor } from 'app/shared/model/instructor.model';
import { InstructorService } from './instructor.service';
import { IInstructordetail } from 'app/shared/model/instructordetail.model';
import { InstructordetailService } from 'app/entities/instructordetail';

@Component({
    selector: 'jhi-instructor-update',
    templateUrl: './instructor-update.component.html'
})
export class InstructorUpdateComponent implements OnInit {
    private _instructor: IInstructor;
    isSaving: boolean;

    instructordetails: IInstructordetail[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private instructorService: InstructorService,
        private instructordetailService: InstructordetailService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ instructor }) => {
            this.instructor = instructor;
        });
        this.instructordetailService.query({ filter: 'instructor-is-null' }).subscribe(
            (res: HttpResponse<IInstructordetail[]>) => {
                if (!this.instructor.instructordetail || !this.instructor.instructordetail.id) {
                    this.instructordetails = res.body;
                } else {
                    this.instructordetailService.find(this.instructor.instructordetail.id).subscribe(
                        (subRes: HttpResponse<IInstructordetail>) => {
                            this.instructordetails = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.instructor.id !== undefined) {
            this.subscribeToSaveResponse(this.instructorService.update(this.instructor));
        } else {
            this.subscribeToSaveResponse(this.instructorService.create(this.instructor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInstructor>>) {
        result.subscribe((res: HttpResponse<IInstructor>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackInstructordetailById(index: number, item: IInstructordetail) {
        return item.id;
    }
    get instructor() {
        return this._instructor;
    }

    set instructor(instructor: IInstructor) {
        this._instructor = instructor;
    }
}

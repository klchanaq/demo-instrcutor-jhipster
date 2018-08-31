import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInstructor } from 'app/shared/model/instructor.model';
import { Principal } from 'app/core';
import { InstructorService } from './instructor.service';

@Component({
    selector: 'jhi-instructor',
    templateUrl: './instructor.component.html'
})
export class InstructorComponent implements OnInit, OnDestroy {
    instructors: IInstructor[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private instructorService: InstructorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.instructorService.query().subscribe(
            (res: HttpResponse<IInstructor[]>) => {
                this.instructors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInInstructors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInstructor) {
        return item.id;
    }

    registerChangeInInstructors() {
        this.eventSubscriber = this.eventManager.subscribe('instructorListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

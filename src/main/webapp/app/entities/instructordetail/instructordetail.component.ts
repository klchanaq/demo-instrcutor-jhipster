import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInstructordetail } from 'app/shared/model/instructordetail.model';
import { Principal } from 'app/core';
import { InstructordetailService } from './instructordetail.service';

@Component({
    selector: 'jhi-instructordetail',
    templateUrl: './instructordetail.component.html'
})
export class InstructordetailComponent implements OnInit, OnDestroy {
    instructordetails: IInstructordetail[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private instructordetailService: InstructordetailService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.instructordetailService.query().subscribe(
            (res: HttpResponse<IInstructordetail[]>) => {
                this.instructordetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInInstructordetails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInstructordetail) {
        return item.id;
    }

    registerChangeInInstructordetails() {
        this.eventSubscriber = this.eventManager.subscribe('instructordetailListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

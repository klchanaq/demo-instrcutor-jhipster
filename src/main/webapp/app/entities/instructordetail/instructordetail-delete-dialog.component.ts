import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInstructordetail } from 'app/shared/model/instructordetail.model';
import { InstructordetailService } from './instructordetail.service';

@Component({
    selector: 'jhi-instructordetail-delete-dialog',
    templateUrl: './instructordetail-delete-dialog.component.html'
})
export class InstructordetailDeleteDialogComponent {
    instructordetail: IInstructordetail;

    constructor(
        private instructordetailService: InstructordetailService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.instructordetailService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'instructordetailListModification',
                content: 'Deleted an instructordetail'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-instructordetail-delete-popup',
    template: ''
})
export class InstructordetailDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ instructordetail }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InstructordetailDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.instructordetail = instructordetail;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

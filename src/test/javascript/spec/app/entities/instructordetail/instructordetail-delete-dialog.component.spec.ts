/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhInstructorDemoTestModule } from '../../../test.module';
import { InstructordetailDeleteDialogComponent } from 'app/entities/instructordetail/instructordetail-delete-dialog.component';
import { InstructordetailService } from 'app/entities/instructordetail/instructordetail.service';

describe('Component Tests', () => {
    describe('Instructordetail Management Delete Component', () => {
        let comp: InstructordetailDeleteDialogComponent;
        let fixture: ComponentFixture<InstructordetailDeleteDialogComponent>;
        let service: InstructordetailService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhInstructorDemoTestModule],
                declarations: [InstructordetailDeleteDialogComponent]
            })
                .overrideTemplate(InstructordetailDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InstructordetailDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InstructordetailService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});

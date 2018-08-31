/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhInstructorDemoTestModule } from '../../../test.module';
import { InstructorDeleteDialogComponent } from 'app/entities/instructor/instructor-delete-dialog.component';
import { InstructorService } from 'app/entities/instructor/instructor.service';

describe('Component Tests', () => {
    describe('Instructor Management Delete Component', () => {
        let comp: InstructorDeleteDialogComponent;
        let fixture: ComponentFixture<InstructorDeleteDialogComponent>;
        let service: InstructorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhInstructorDemoTestModule],
                declarations: [InstructorDeleteDialogComponent]
            })
                .overrideTemplate(InstructorDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InstructorDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InstructorService);
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

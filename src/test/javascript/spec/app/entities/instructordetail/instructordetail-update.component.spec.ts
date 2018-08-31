/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhInstructorDemoTestModule } from '../../../test.module';
import { InstructordetailUpdateComponent } from 'app/entities/instructordetail/instructordetail-update.component';
import { InstructordetailService } from 'app/entities/instructordetail/instructordetail.service';
import { Instructordetail } from 'app/shared/model/instructordetail.model';

describe('Component Tests', () => {
    describe('Instructordetail Management Update Component', () => {
        let comp: InstructordetailUpdateComponent;
        let fixture: ComponentFixture<InstructordetailUpdateComponent>;
        let service: InstructordetailService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhInstructorDemoTestModule],
                declarations: [InstructordetailUpdateComponent]
            })
                .overrideTemplate(InstructordetailUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InstructordetailUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InstructordetailService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Instructordetail(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.instructordetail = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Instructordetail();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.instructordetail = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});

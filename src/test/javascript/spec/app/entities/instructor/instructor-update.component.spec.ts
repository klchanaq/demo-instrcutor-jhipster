/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhInstructorDemoTestModule } from '../../../test.module';
import { InstructorUpdateComponent } from 'app/entities/instructor/instructor-update.component';
import { InstructorService } from 'app/entities/instructor/instructor.service';
import { Instructor } from 'app/shared/model/instructor.model';

describe('Component Tests', () => {
    describe('Instructor Management Update Component', () => {
        let comp: InstructorUpdateComponent;
        let fixture: ComponentFixture<InstructorUpdateComponent>;
        let service: InstructorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhInstructorDemoTestModule],
                declarations: [InstructorUpdateComponent]
            })
                .overrideTemplate(InstructorUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InstructorUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InstructorService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Instructor(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.instructor = entity;
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
                    const entity = new Instructor();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.instructor = entity;
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

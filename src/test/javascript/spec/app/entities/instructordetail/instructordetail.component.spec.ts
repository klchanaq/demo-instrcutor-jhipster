/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhInstructorDemoTestModule } from '../../../test.module';
import { InstructordetailComponent } from 'app/entities/instructordetail/instructordetail.component';
import { InstructordetailService } from 'app/entities/instructordetail/instructordetail.service';
import { Instructordetail } from 'app/shared/model/instructordetail.model';

describe('Component Tests', () => {
    describe('Instructordetail Management Component', () => {
        let comp: InstructordetailComponent;
        let fixture: ComponentFixture<InstructordetailComponent>;
        let service: InstructordetailService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhInstructorDemoTestModule],
                declarations: [InstructordetailComponent],
                providers: []
            })
                .overrideTemplate(InstructordetailComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InstructordetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InstructordetailService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Instructordetail(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.instructordetails[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

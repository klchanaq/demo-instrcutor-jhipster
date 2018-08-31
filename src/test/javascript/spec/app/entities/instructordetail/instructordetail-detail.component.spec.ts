/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhInstructorDemoTestModule } from '../../../test.module';
import { InstructordetailDetailComponent } from 'app/entities/instructordetail/instructordetail-detail.component';
import { Instructordetail } from 'app/shared/model/instructordetail.model';

describe('Component Tests', () => {
    describe('Instructordetail Management Detail Component', () => {
        let comp: InstructordetailDetailComponent;
        let fixture: ComponentFixture<InstructordetailDetailComponent>;
        const route = ({ data: of({ instructordetail: new Instructordetail(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhInstructorDemoTestModule],
                declarations: [InstructordetailDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InstructordetailDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InstructordetailDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.instructordetail).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

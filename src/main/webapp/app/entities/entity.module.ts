import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhInstructorDemoInstructorModule } from './instructor/instructor.module';
import { JhInstructorDemoInstructordetailModule } from './instructordetail/instructordetail.module';
import { JhInstructorDemoCourseModule } from './course/course.module';
import { JhInstructorDemoReviewModule } from './review/review.module';
import { JhInstructorDemoStudentModule } from './student/student.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhInstructorDemoInstructorModule,
        JhInstructorDemoInstructordetailModule,
        JhInstructorDemoCourseModule,
        JhInstructorDemoReviewModule,
        JhInstructorDemoStudentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhInstructorDemoEntityModule {}

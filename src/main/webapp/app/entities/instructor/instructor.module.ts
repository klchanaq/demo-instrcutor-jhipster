import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhInstructorDemoSharedModule } from 'app/shared';
import {
    InstructorComponent,
    InstructorDetailComponent,
    InstructorUpdateComponent,
    InstructorDeletePopupComponent,
    InstructorDeleteDialogComponent,
    instructorRoute,
    instructorPopupRoute
} from './';

const ENTITY_STATES = [...instructorRoute, ...instructorPopupRoute];

@NgModule({
    imports: [JhInstructorDemoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InstructorComponent,
        InstructorDetailComponent,
        InstructorUpdateComponent,
        InstructorDeleteDialogComponent,
        InstructorDeletePopupComponent
    ],
    entryComponents: [InstructorComponent, InstructorUpdateComponent, InstructorDeleteDialogComponent, InstructorDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhInstructorDemoInstructorModule {}

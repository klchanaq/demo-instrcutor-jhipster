import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhInstructorDemoSharedModule } from 'app/shared';
import {
    InstructordetailComponent,
    InstructordetailDetailComponent,
    InstructordetailUpdateComponent,
    InstructordetailDeletePopupComponent,
    InstructordetailDeleteDialogComponent,
    instructordetailRoute,
    instructordetailPopupRoute
} from './';

const ENTITY_STATES = [...instructordetailRoute, ...instructordetailPopupRoute];

@NgModule({
    imports: [JhInstructorDemoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InstructordetailComponent,
        InstructordetailDetailComponent,
        InstructordetailUpdateComponent,
        InstructordetailDeleteDialogComponent,
        InstructordetailDeletePopupComponent
    ],
    entryComponents: [
        InstructordetailComponent,
        InstructordetailUpdateComponent,
        InstructordetailDeleteDialogComponent,
        InstructordetailDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhInstructorDemoInstructordetailModule {}

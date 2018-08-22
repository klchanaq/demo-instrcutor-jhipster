import { NgModule } from '@angular/core';

import { JhInstructorDemoSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [JhInstructorDemoSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [JhInstructorDemoSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhInstructorDemoSharedCommonModule {}

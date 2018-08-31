import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Instructor } from 'app/shared/model/instructor.model';
import { InstructorService } from './instructor.service';
import { InstructorComponent } from './instructor.component';
import { InstructorDetailComponent } from './instructor-detail.component';
import { InstructorUpdateComponent } from './instructor-update.component';
import { InstructorDeletePopupComponent } from './instructor-delete-dialog.component';
import { IInstructor } from 'app/shared/model/instructor.model';

@Injectable({ providedIn: 'root' })
export class InstructorResolve implements Resolve<IInstructor> {
    constructor(private service: InstructorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((instructor: HttpResponse<Instructor>) => instructor.body));
        }
        return of(new Instructor());
    }
}

export const instructorRoute: Routes = [
    {
        path: 'instructor',
        component: InstructorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Instructors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'instructor/:id/view',
        component: InstructorDetailComponent,
        resolve: {
            instructor: InstructorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Instructors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'instructor/new',
        component: InstructorUpdateComponent,
        resolve: {
            instructor: InstructorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Instructors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'instructor/:id/edit',
        component: InstructorUpdateComponent,
        resolve: {
            instructor: InstructorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Instructors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const instructorPopupRoute: Routes = [
    {
        path: 'instructor/:id/delete',
        component: InstructorDeletePopupComponent,
        resolve: {
            instructor: InstructorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Instructors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

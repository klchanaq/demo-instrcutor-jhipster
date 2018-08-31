import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Instructordetail } from 'app/shared/model/instructordetail.model';
import { InstructordetailService } from './instructordetail.service';
import { InstructordetailComponent } from './instructordetail.component';
import { InstructordetailDetailComponent } from './instructordetail-detail.component';
import { InstructordetailUpdateComponent } from './instructordetail-update.component';
import { InstructordetailDeletePopupComponent } from './instructordetail-delete-dialog.component';
import { IInstructordetail } from 'app/shared/model/instructordetail.model';

@Injectable({ providedIn: 'root' })
export class InstructordetailResolve implements Resolve<IInstructordetail> {
    constructor(private service: InstructordetailService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((instructordetail: HttpResponse<Instructordetail>) => instructordetail.body));
        }
        return of(new Instructordetail());
    }
}

export const instructordetailRoute: Routes = [
    {
        path: 'instructordetail',
        component: InstructordetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Instructordetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'instructordetail/:id/view',
        component: InstructordetailDetailComponent,
        resolve: {
            instructordetail: InstructordetailResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Instructordetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'instructordetail/new',
        component: InstructordetailUpdateComponent,
        resolve: {
            instructordetail: InstructordetailResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Instructordetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'instructordetail/:id/edit',
        component: InstructordetailUpdateComponent,
        resolve: {
            instructordetail: InstructordetailResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Instructordetails'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const instructordetailPopupRoute: Routes = [
    {
        path: 'instructordetail/:id/delete',
        component: InstructordetailDeletePopupComponent,
        resolve: {
            instructordetail: InstructordetailResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Instructordetails'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

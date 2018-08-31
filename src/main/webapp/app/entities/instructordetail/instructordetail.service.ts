import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInstructordetail } from 'app/shared/model/instructordetail.model';

type EntityResponseType = HttpResponse<IInstructordetail>;
type EntityArrayResponseType = HttpResponse<IInstructordetail[]>;

@Injectable({ providedIn: 'root' })
export class InstructordetailService {
    private resourceUrl = SERVER_API_URL + 'api/instructordetails';

    constructor(private http: HttpClient) {}

    create(instructordetail: IInstructordetail): Observable<EntityResponseType> {
        return this.http.post<IInstructordetail>(this.resourceUrl, instructordetail, { observe: 'response' });
    }

    update(instructordetail: IInstructordetail): Observable<EntityResponseType> {
        return this.http.put<IInstructordetail>(this.resourceUrl, instructordetail, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IInstructordetail>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInstructordetail[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

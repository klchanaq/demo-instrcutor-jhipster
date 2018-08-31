import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInstructor } from 'app/shared/model/instructor.model';

type EntityResponseType = HttpResponse<IInstructor>;
type EntityArrayResponseType = HttpResponse<IInstructor[]>;

@Injectable({ providedIn: 'root' })
export class InstructorService {
    private resourceUrl = SERVER_API_URL + 'api/instructors';

    constructor(private http: HttpClient) {}

    create(instructor: IInstructor): Observable<EntityResponseType> {
        return this.http.post<IInstructor>(this.resourceUrl, instructor, { observe: 'response' });
    }

    update(instructor: IInstructor): Observable<EntityResponseType> {
        return this.http.put<IInstructor>(this.resourceUrl, instructor, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IInstructor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInstructor[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

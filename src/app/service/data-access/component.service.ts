/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import {
  Pagination,
  paginationToQueryString
} from '../../constants/pagination/pagination.model';
import { HttpMethod } from '@auth0/auth0-angular';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ComponentResponse } from '../../constants/responseTypes/component.response';
import { environment } from '../../../environments/environment';
import { ComponentModel } from '../../constants/componentTypes/component.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  constructor(
    private http: HttpClient,
    private notifier: NotifierService
  ) {}

  prefix = 'component';

  getComponents(pagination: Pagination): Observable<ComponentResponse> {
    return this.http
      .request(
        HttpMethod.Get,
        `${environment.apiUrl}/${this.prefix}?${paginationToQueryString(
          pagination
        )}`
      )
      .pipe(
        catchError((error) => {
          this.notifier.notify('error', error.message);
          return throwError(error);
        }),
        map(
          (response: any) =>
            ({
              status: response.status,
              message: response.message,
              data: {
                components: response.data.data,
                total: response.data.total
              }
            }) as ComponentResponse
        )
      );
  }

  checkComponentExists(componentNames: string[]): Observable<string[]> {
    return this.http
      .post(`${environment.apiUrl}/${this.prefix}/check`, componentNames)
      .pipe(
        catchError((error) => {
          this.notifier.notify('error', error.message);
          return throwError(error);
        }),
        map((response: any): string[] => response) // Update the type of response to string[]
      );
  }

  batchImportComponents(
    components: ComponentModel[]
  ): Observable<ComponentResponse> {
    return this.http
      .post(`${environment.apiUrl}/${this.prefix}`, components)
      .pipe(map((response: any) => response as ComponentResponse));
  }
}

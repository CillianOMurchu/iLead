import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  map,
  startWith,
  catchError,
  throwError,
  finalize,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) {}

  sendQuery(message: string): Observable<any> {
    // private apiUrl = '/api/chat'; // Assuming your Angular app and server are on the same domain

    return this.http.post<any>(this.apiUrl, { message }).pipe(
      map((response) => ({ loading: false, data: response.message })),
      startWith({ loading: true }),
      catchError((error: HttpErrorResponse) => {
        // Handle HTTP errors properly
        return throwError(error);
      }),
      finalize(() => {
        // Perform any cleanup actions here if needed
      })
    );
    // console.log('trying to post now', query);
    // return this.http.post<any>(this.apiUrl, { query });
    // return this.http.post<{ message: string }>(this.apiUrl, { query });
    // .pipe(
    // map((response) => ({ loading: false, data: response.message })),
    // startWith({ loading: true }),
    // catchError((error: HttpErrorResponse) => {
    // Handle HTTP errors properly
    // return throwError(error);
    // }),
    // finalize(() => {
    // Perform any cleanup actions here if needed
    // })
    // );
  }
}

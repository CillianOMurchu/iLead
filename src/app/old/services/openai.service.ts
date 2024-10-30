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
  }
}

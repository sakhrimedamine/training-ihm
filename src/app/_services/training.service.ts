import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../shared/api-response';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Training } from '@app/_models';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private trainingUrl = `${environment.apiUrl}/training-service/training`;

  constructor(private http: HttpClient) {}

  createTraining(training: Training): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(this.trainingUrl, training)
      .pipe(catchError(this.handleError));
  }

  getAll(): Observable<Training[]> {
    return this.http.get<Training[]>(this.trainingUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

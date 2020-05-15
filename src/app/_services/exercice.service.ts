import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { ApiResponse } from '../shared/api-response';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { Muscle, Exercice } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class ExerciceService {

  private exerciceUrl = `${environment.apiUrl}/exercice-service/exercices`;

  constructor(
    private http: HttpClient
    ) { }

  getExercicesByMuscle(muscle:Muscle): Observable<Exercice[]> {
    console.log("Getting Exercices by muscle " + muscle);
    const params = new HttpParams().set('muscle', muscle);
    return this.http.get<Exercice[]>(this.exerciceUrl, { params })
        .pipe(
          catchError(this.handleError)
        );
  }

  getAllExercices(): Observable<Exercice[]> {
    console.log("Getting all Exercices");
    return this.http.get<Exercice[]>(this.exerciceUrl,)
        .pipe(
          catchError(this.handleError)
        );
  }

  createExercice(exerciceForm: FormGroup): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('name', exerciceForm["name"]);
    formData.append('muscle', exerciceForm["muscle"]);
    formData.append('description', exerciceForm["description"]);
    return this.http.post<ApiResponse>(this.exerciceUrl, formData )
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

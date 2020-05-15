import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ApiResponse } from '@app/shared/api-response';

@Injectable({ providedIn: 'root' })
export class UserService {

    userUrl :string = `${environment.apiUrl}/user-service/users`;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.userUrl)
                        .pipe(
                          tap(data => console.log('All: ' + JSON.stringify(data))),
                          catchError(this.handleError)
                        );
    }

    getById(id: string) {
        return this.http.get<User>(this.userUrl+"/"+id).pipe(
          tap(data => console.log('Retreived user: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }

    create(user: User) {
      return this.http.post(this.userUrl, user)
                      .pipe(catchError(this.handleError));

    }

    createUser(userForm: FormGroup): Observable<ApiResponse> {
      console.log(userForm.value);
      return this.http.post<ApiResponse>(this.userUrl, userForm )
                      .pipe(catchError(this.handleError));
    }

    filterUsers(userForm: FormGroup): Observable<User[]> {
      const formValue = userForm.value; // this.form should be a FormGroup
      const params = new HttpParams()
                    .set('userId', formValue['userId'])
                    .set('firstName', formValue['firstName'])
                    .set('lastName', formValue['lastName'])
                    .set('age', formValue['age'])
                    .set('weight', formValue['weight'])
                    .set('height', formValue['height']);

      console.log(params.toString());
      return this.http.get<User[]>(this.userUrl, {params})
        .pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
      // in a real world app, we may send the server to some remote logging infrastructure
      // instead of just logging it to the console
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err}`;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,

        if(err.error.message == "DUPLICATE_USERNAME")
          errorMessage = "Username already exist."
        else
          errorMessage = err.error.message;
       }
      return throwError(errorMessage);
    }
}

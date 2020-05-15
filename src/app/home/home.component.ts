import { Component } from '@angular/core';
import { first, catchError } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService, AlertService } from '@app/_services';
import { Observable, EMPTY } from 'rxjs';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi$: Observable<User>;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loading = true;
        this.userFromApi$ = this.userService.getById(this.currentUser.userId).pipe(first()).pipe(
          catchError(err => {
                              this.alertService.error(err);
                              return EMPTY;
                            })
        );
        this.loading = false;
    }
}

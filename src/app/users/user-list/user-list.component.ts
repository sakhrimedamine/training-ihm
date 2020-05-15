import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '@app/_models';
import { UserService, AlertService } from '@app/_services';
import { BehaviorSubject, Observable, Subject, combineLatest, EMPTY } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent  {

  constructor(
    private userSerice:UserService,
    private alertService:AlertService ) { }

  users$ = this.userSerice.getAll();

  private filtredUsersSubject = new BehaviorSubject<FormGroup>(null);
  filtredUsersAction$ : Observable<FormGroup> = this.filtredUsersSubject.asObservable();

  filtredUsers$ = combineLatest([this.users$, this.filtredUsersAction$]).pipe(
    map(([users, filters]) => users.filter(user => filters ? this.filterUsers(user, filters) :  true  )),
    catchError(err => {
                        this.alertService.error(err);
                        return EMPTY;
                      })
  );

  onFilterClicked(userForm: FormGroup): void {
    if(userForm)
      console.log(userForm.value);
    this.filtredUsersSubject.next(userForm);
  }

  private filterUsers(user:User, userForm: FormGroup) : boolean {
    let userId : string = userForm.get("userId").value;
    let firstName : string = userForm.get("firstName").value;
    let lastName : string = userForm.get("lastName").value;
    let age : string = userForm.get("age").value;
    let weight : string = userForm.get("weight").value;
    let height : string = userForm.get("height").value;

    if(userId!= null && userId != "" && user.userId != userId)
       return false;

    if(firstName!= null && firstName != "" && user.firstName != firstName)
       return false;

    if(lastName!= null && lastName != "" && user.lastName != lastName)
       return false;

    if(age!= null && age != "" && user.age != Number.parseInt(age))
       return false;

    if(weight!= null && weight != "" && user.weight != Number.parseInt(weight))
       return false;

    if(height!= null && height != "" && user.height != Number.parseInt(height))
       return false;

    return true;
  }
}

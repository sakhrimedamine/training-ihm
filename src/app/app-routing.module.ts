import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { RegisterComponent } from './register';
import { UserListComponent } from './users/user-list/user-list.component';
import { NewUserComponent } from './users/new-user';
import { ExerciceListComponent } from './exercice/exercice-list/exercice-list.component';
import { NewExerciceComponent } from './exercice/new-exercice/new-exercice.component';
import { TrainingListComponent } from './training/training-list/training-list.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
  },
  {   path: 'users',
      component: UserListComponent,
      canActivate: [AuthGuard]
  },
  {   path: 'users/new',
      component: NewUserComponent,
      canActivate: [AuthGuard],
      data: { roles: [Role.Admin] }
  },
  {   path: 'exercices',
      component: ExerciceListComponent,
      canActivate: [AuthGuard]
  },
  {   path: 'exercices/new',
      component: NewExerciceComponent,
      canActivate: [AuthGuard]
  },
  {   path: 'training',
      component: TrainingListComponent,
      canActivate: [AuthGuard]
  },
  {   path: 'training/new',
      component: NewTrainingComponent,
      canActivate: [AuthGuard]
  },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

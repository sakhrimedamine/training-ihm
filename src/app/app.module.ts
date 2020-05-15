import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AlertModule } from './alert/alert-module';
import { RegisterComponent } from './register';
import { AppRoutingModule } from './app-routing.module';
import { UserListComponent } from './users/user-list';
import { NewUserComponent } from './users/new-user';
import { FiltersComponent } from './users/user-list/filters';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NewExerciceComponent } from './exercice/new-exercice/new-exercice.component';
import { ExerciceListComponent } from './exercice/exercice-list/exercice-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { TrainingListComponent } from './training/training-list/training-list.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        AlertModule,
        MatTableModule, MatCheckboxModule, MatStepperModule, MatInputModule, MatButtonModule, MatSelectModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        UserListComponent,
        NewUserComponent,
        FiltersComponent,
        ExerciceListComponent,
        NewExerciceComponent,
        TrainingListComponent,
        NewTrainingComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }

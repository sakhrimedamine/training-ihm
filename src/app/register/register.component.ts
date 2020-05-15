import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatchValidator } from '@app/shared';

@Component({
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue],
            role: ['user'],
            age: ['23'],
            weight: ['80'],
            height: ['180'],

        }, {
            validator: MustMatchValidator('password', 'confirmPassword')
        });
    }

    get f() { return this.registerForm.controls; }

    register() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.create(this.registerForm.value)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', { autoClose: true, keepAfterRouteChange: true});
                    this.router.navigate(['login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}

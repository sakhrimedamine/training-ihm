import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService, AlertService } from '@app/_services';
import { MustMatchValidator } from '@app/shared';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private alertService: AlertService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          role: ['', Validators.required],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(8)]],
          confirmPassword: ['', Validators.required],
          age: ['', Validators.required],
          weight: ['', Validators.required],
          height: ['', Validators.required],
          acceptTerms: [false, Validators.requiredTrue]
      }, {
          validator: MustMatchValidator('password', 'confirmPassword')
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.create();
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

  create() {
    this.userService.createUser(this.registerForm.value).subscribe(
      data => {
        this.alertService.info("User successfully created.");
         },
      error => {
        this.alertService.error(error);
      }  );
  }
}

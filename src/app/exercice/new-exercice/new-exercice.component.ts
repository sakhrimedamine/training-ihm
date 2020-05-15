import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService, ExerciceService } from '@app/_services';
import { Muscle } from '@app/_models';

@Component({
  selector: 'app-new-exercice',
  templateUrl: './new-exercice.component.html',
  styleUrls: ['./new-exercice.component.css']
})
export class NewExerciceComponent implements OnInit {

  exerciceForm: FormGroup;
  muscles : string[] = Object.keys(Muscle);
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private exerciceService: ExerciceService,
    protected alertService: AlertService
    ) {}

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.exerciceForm = this.formBuilder.group({
      name: new FormControl('', [ Validators.required, Validators.minLength(4)]),
      muscle: new FormControl('', Validators.required),
      description: [''],
    });
  }


  // convenience getter for easy access to form fields
  get f() { return this.exerciceForm.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.exerciceForm.invalid) {
        return;
    }

    this.create();
  }

  onReset() {
      this.submitted = false;
      this.exerciceForm.reset();
  }
  create() {
    this.exerciceService.createExercice(this.exerciceForm.value).subscribe(
      data => {
        console.log(data);
        this.alertService.info(data.message);
          },
      error => {
        this.alertService.error(error);
      }  );
  }

}

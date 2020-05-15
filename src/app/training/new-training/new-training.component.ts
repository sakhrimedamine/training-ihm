import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, Injector, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Muscle } from 'src/app/exercice/muscle.enum';
import { AlertService, TrainingService } from '@app/_services';
import { Training } from '@app/_models';
import { ExerciceListComponent } from '@app/exercice/exercice-list/exercice-list.component';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  submitted = false;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  muscles : string[] = Object.keys(Muscle);

  @ViewChild(ExerciceListComponent)
  exerciceListComponentt: ExerciceListComponent;

  constructor(private _formBuilder: FormBuilder,
    private trainingService: TrainingService,
    private alertService: AlertService,
    ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      muscle: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      exercices : ['', Validators.required]
    });
  }

  get f1() { return this.firstFormGroup.controls; }
  get f2() { return this.secondFormGroup.controls; }

  step2() {
    this.submitted = true;

    if (this.firstFormGroup.invalid) {
          return;
    }
      this.exerciceListComponentt.reload();
  }

  receiveSelectedExercices($event) {
    console.log($event);
    this.secondFormGroup.get("exercices").setValue($event);
  }

  createTraining() {
    let training : Training = new Training();
    training.name = this.firstFormGroup.get("name").value;
    training.muscle = this.firstFormGroup.get("muscle").value;
    training.description = this.firstFormGroup.get("name").value;
    this.secondFormGroup.get("exercices").value.forEach(element => {
      training.exercicesId.push(element.id);
    });
    console.log(training);
    this.trainingService.createTraining(training).subscribe(
      data => {
        console.log(data);
        this.alertService.info(data.message);
         },
      error => {
        this.alertService.error(error);
      }  );
  }

}

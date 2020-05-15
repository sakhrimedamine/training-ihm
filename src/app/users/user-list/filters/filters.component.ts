import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  userForm: FormGroup;

  @Output() filterClicked: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log("Filters")
    this.initFormGroup();
  }

  initFormGroup() {
    this.userForm = this.formBuilder.group({
      userId: [''],
      firstName: [''],
      lastName: [''],
      age: [''],
      weight: [''],
      height: [''],
    });
  }

  filter() {
    this.filterClicked.emit(this.userForm);
  }

  reset() {
    this.initFormGroup();
    this.filterClicked.emit(null);
  }
}

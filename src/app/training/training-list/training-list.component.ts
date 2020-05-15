import { Component, OnInit } from '@angular/core';
import { TrainingService, AlertService} from '@app/_services';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {

  constructor(
    private trainingService:TrainingService ) { }

  training$ = this.trainingService.getAll();

  ngOnInit() {
  }

}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Exercice, Muscle } from '@app/_models';
import { ExerciceService, AlertService } from '@app/_services';

@Component({
  selector: 'app-exercice-list',
  templateUrl: './exercice-list.component.html',
  styleUrls: ['./exercice-list.component.css']
})
export class ExerciceListComponent implements OnInit {

  exercices : Exercice[] = [];
  displayedColumns: string[] = ['select', 'name', 'muscle', 'description'];
  dataSource = new MatTableDataSource<Exercice>();
  selection = new SelectionModel<Exercice>(true, []);

  @Input() muscle : Muscle;
  @Input() init : boolean = true;
  @Output() selectExercicesEvent = new EventEmitter<Exercice[]>();

  constructor(private exerciceService:ExerciceService,
              private alertService: AlertService) { }

  ngOnInit() {
    if(this.init) {
      let service : Observable<Exercice[]>;
      console.log(this.muscle);
      if(this.muscle != null) {
        service = this.exerciceService.getExercicesByMuscle(this.muscle);
      } else {
        service = this.exerciceService.getAllExercices();
      }
      service.subscribe(
        exercices => {
          this.exercices = exercices;
          this.dataSource.data = exercices;
          }, error => {
                  this.alertService.error(error);
      });
    }
  }

  reload() {
    this.exerciceService.getExercicesByMuscle(this.muscle).subscribe(
      exercices => {
        this.exercices = exercices;
        this.dataSource.data = exercices;
        }, error => {
                this.alertService.error(error);
    });

  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
          this.selectExercicesEvent.emit(this.selection.selected);
    }

  updateSelection(row) {
    this.selection.toggle(row);
    this.selectExercicesEvent.emit(this.selection.selected);
  }
}

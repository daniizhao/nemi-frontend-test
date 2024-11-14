import { AfterViewInit, booleanAttribute, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import Service from '../../utils/interfaces/service';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MapComponent } from "../map/map.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    TranslateModule,
    InputComponent,
    ButtonComponent,
    MatIconModule,
    MapComponent
],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TableComponent implements AfterViewInit {

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }

  @Input() set serviceData(value: Service[]) {
    this.dataSource = new MatTableDataSource(value);
  }
  @Input() displayedColumns: string[] = [];

  @Input({transform: booleanAttribute}) showCreateButton: boolean = true;
  @Input() createButtonText: string = 'LABELS.NEW';
  @Input() createButtonIcon: string = 'add';
  @Output() onCreateButtonClick: EventEmitter<any> = new EventEmitter();

  dataSource = new MatTableDataSource<Service>([]);
  expandedElement: Service | null;

  constructor() {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("filter", filterValue)
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleCreateButtonClick() {
    console.log("tasdf")
    this.onCreateButtonClick.emit();
  }

  onExpandRow(element: Service) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

}

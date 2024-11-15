import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from "../../components/header/header.component";
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import Service from '../../utils/interfaces/service';
import { TableComponent } from "../../components/table/table.component";
import { LoadingService } from '../../services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TableColumnInfo } from '../../utils/interfaces/table';
import { SERVICES_TABLE_COLUMNS } from '../../utils/constants';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    TranslateModule,
    HeaderComponent,
    TableComponent,
    MatSnackBarModule,
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  private loadingService = inject(LoadingService);
  private dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  services: Service[] = [];
  servicesColumns: TableColumnInfo[] = SERVICES_TABLE_COLUMNS;

  constructor(
    private router: Router,
    private servicesService: ServicesService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.updateList();
  }

  updateList() {
    this.loadingService.showLoading();
    this.servicesService.getSortedByIdServices().subscribe(
      (data) => {
        this.services = data;
        this.loadingService.hideLoading();
      }
    );
  }

  onNavigate(path: string) {
    this.router.navigate([path]);
  }

  onEditService(serviceId: string) {
    this.router.navigate(['/edit', serviceId]);
  }

  onDeleteService(serviceId: number) {
    const serviceName = this.services.find(serv => serv.id === serviceId)?.name ?? '';
    const dialogRef = this.dialog.open(
      DialogComponent,
      {
        data: {
          title: this.translateService.instant('SERVICES.DELETE.TITLE', {serviceName: serviceName}),
          description: this.translateService.instant('SERVICES.DELETE.DESCRIPTION'),
          confirmTextButton: 'LABELS.YES',
          cancelTextButton: 'LABELS.NO'
        }
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.servicesService.deleteService(serviceId).subscribe({
          next: (result) => {
            this.updateList();
            this._snackBar.open(
              this.translateService.instant('SERVICES.DELETE.SUCCESS'),
              this.translateService.instant('LABELS.OK'),
              {
                duration: 1500
              }
            );
          },
          error: (error) => {
            this._snackBar.open(
              this.translateService.instant(error.error.message),
              this.translateService.instant('LABELS.OK'),
              {
                duration: 1500
              }
            );
          }
        })
      }
    })
  }

}

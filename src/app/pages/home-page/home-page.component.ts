import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from "../../components/header/header.component";
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import Service from '../../utils/interfaces/service';
import { TableComponent } from "../../components/table/table.component";
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    TranslateModule,
    HeaderComponent,
    TableComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  private loadingService = inject(LoadingService);

  services: Service[] = [];

  constructor(
    private router: Router,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
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

}
